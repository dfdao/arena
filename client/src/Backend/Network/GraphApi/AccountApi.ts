import { EthAddress, RawAccount } from '@darkforest_eth/types';
import { CONFIG_CONSTANTS } from '../../../Frontend/Utils/constants';
import { getGraphQLData } from '../GraphApi';
import { getNetwork } from '../Blockchain';

export async function loadAccountData(address: EthAddress): Promise<RawAccount | undefined> {
  const query = `
query {
  player(id:"${address}") {
   	wins
    matches
    arenaPlayers {
      arena{
        lobbyAddress,
        configHash,
        gameOver,
        startTime,
        ${CONFIG_CONSTANTS}
      }
    }
  }
}
`;
  return (await getGraphQLData(query, getNetwork().graphUrl || 'localhost:8000')).data.player;
}
