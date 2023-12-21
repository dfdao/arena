import { DFArenaInitialize, DarkForest } from '@darkforest_eth/contracts/typechain';
import { EthAddress } from '@darkforest_eth/types';
import { TransactionReceipt } from '@ethersproject/providers';
import { keccak256, toUtf8Bytes } from 'ethers/lib/utils';
import { address } from '@darkforest_eth/serde';
import { World } from './TestWorld';
import hre from 'hardhat';

export function getLobbyCreatedEvent(
  lobbyReceipt: TransactionReceipt,
  contract: DarkForest
): { owner: EthAddress; lobby: EthAddress } {
  const lobbyCreatedHash = keccak256(toUtf8Bytes('LobbyCreated(address,address)'));
  const log = lobbyReceipt.logs.find((log) => log.topics[0] === lobbyCreatedHash);
  if (log) {
    return {
      owner: address(contract.interface.parseLog(log).args.creatorAddress),
      lobby: address(contract.interface.parseLog(log).args.lobbyAddress),
    };
  } else {
    throw new Error('Lobby Created event not found');
  }
}

export async function newArena(
  world: World,
  inits: Awaited<ReturnType<DarkForest['getInitializers']>>
) {
  const diamondInit = world.diamondInit as DFArenaInitialize;
  const initFunctionCall = diamondInit.interface.encodeFunctionData('init', [
    { ...inits.initArgs },
    {
      ...inits.auxArgs,
    },
  ]);
  const tx = await world.user1Core.createLobby(world.diamondInit.address, initFunctionCall);
  const rc = await tx.wait();

  const { lobby } = getLobbyCreatedEvent(rc, world.user1Core);

  const arena = (await hre.ethers.getContractAt('DarkForest', lobby)) as DarkForest;
  const startTx = await arena.start();
  await startTx.wait();
  return arena;
}
