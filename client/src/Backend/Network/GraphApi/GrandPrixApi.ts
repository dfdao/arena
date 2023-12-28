import { createContract, EthConnection } from '@darkforest_eth/network';
import { address } from '@darkforest_eth/serde';
import {
  GrandPrixMetadata,
  GraphArena,
  Leaderboard,
  LeaderboardEntry,
} from '@darkforest_eth/types';
import {
  roundEndTimestamp,
  roundStartTimestamp,
  competitiveConfig,
  DUMMY,
  SEASON_GRAND_PRIXS,
} from '../../../Frontend/Utils/constants';
import { getGraphQLData } from '../GraphApi';
import { getAllTwitters } from '../UtilityServerAPI';
// Contract addresses
import deploymentUrl from '@dfdao/registry/deployment.json';
import { Contract, ethers, providers, Wallet } from 'ethers';
import { getNetwork } from '../Blockchain';
import { DFArenaRegistry } from '@darkforest_eth/contracts/typechain';
import registryContractAbiUrl from '@darkforest_eth/contracts/abis/DFArenaRegistry.json';
import { REGISTRY_ADDRESS } from '@darkforest_eth/contracts';

/**
 * Purpose:
 * Fetch necessary data for Grand Prixs
 */

export async function loadArenaLeaderboard(
  config: string = competitiveConfig,
  fromContract = false
): Promise<Leaderboard> {
  const QUERY = `
query {
  arenas(
    first:1000, 
    where: {configHash: "${config}", duration_not: null}
    orderBy: duration
    orderDirection: asc
  )
  {
    id
    startTime
    winners(first :1) {
      address
      moves
   }    
    gameOver
    endTime
    duration
  }
}
`;
  const rawData = await getGraphQLData(QUERY, getNetwork().graphUrl || 'localhost:8000');
  if (rawData.error) {
    throw new Error(rawData.error);
  }
  const ret = await convertData(rawData.data.arenas, config == competitiveConfig);
  return ret;
}

async function convertData(arenas: GraphArena[], isCompetitive: boolean): Promise<Leaderboard> {
  let entries: LeaderboardEntry[] = [];
  const twitters = await getAllTwitters();

  const roundStart = new Date(roundStartTimestamp).getTime() / 1000;

  const roundEnd = new Date(roundEndTimestamp).getTime() / 1000;
  for (const arena of arenas) {
    if (
      !arena.gameOver ||
      !arena.endTime ||
      !arena.duration ||
      // arena.startTime == 0 ||
      // arena.winners.length == 0 ||
      // !arena.winners[0].address ||
      (isCompetitive && (roundEnd <= arena.endTime || roundStart >= arena.startTime))
    )
      continue;

    const winnerAddress = address(arena.winners[0].address);
    const entry = entries.find((p) => winnerAddress == p.ethAddress);

    if (!entry) {
      entries.push({
        ethAddress: winnerAddress,
        score: undefined,
        twitter: twitters[winnerAddress],
        moves: arena.winners[0].moves,
        startTime: arena.startTime,
        endTime: arena.endTime,
        time: arena.duration,
        gamesFinished: 0,
        gamesStarted: 0,
      });
    } else if (entry.time && entry.time > arena.duration) {
      entry.time = arena.duration;
    }
  }

  return { entries, length: arenas.length };
}

export async function loadRegistryContract<T extends Contract>(
  address: string,
  provider: providers.JsonRpcProvider,
  signer?: Wallet
): Promise<T> {
  const abi = await fetch(registryContractAbiUrl).then((r) => r.json());
  return createContract<T>(address, abi, provider, signer);
}

export async function loadRegistry(ethConnection: EthConnection): Promise<GrandPrixMetadata[]> {
  if (DUMMY) {
    return SEASON_GRAND_PRIXS;
  }

  const registry = await ethConnection.loadContract<DFArenaRegistry>(
    REGISTRY_ADDRESS,
    loadRegistryContract
  );

  const allGrandPrix = await registry.getAllGrandPrix();
  console.log(`allGrandPrix`, allGrandPrix);
  const metadata: GrandPrixMetadata[] = [];
  allGrandPrix.map((gp) => {
    if (!gp.deleted) {
      metadata.push({
        configHash: gp.configHash,
        seasonId: gp.seasonId.toNumber(),
        startTime: gp.startTime.toNumber(),
        endTime: gp.endTime.toNumber(),
        deleted: gp.deleted,
        diamondAddress: gp.diamondAddress,
      });
    }
  });
  console.log(`LOADED GRAND PRIX`, metadata);
  return metadata;
}
