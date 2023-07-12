// These are loaded as URL paths by a webpack loader
import { NETWORK } from '@darkforest_eth/contracts';
import { hardhat, Network, networks } from '@darkforest_eth/constants';
import diamondContractAbiUrl from '@darkforest_eth/contracts/abis/DarkForest.json';
import faucetContractAbiUrl from '@darkforest_eth/contracts/abis/DFArenaFaucet.json';
import initContractAbiUrl from '@darkforest_eth/contracts/abis/DFArenaInitialize.json';
import { createContract, createEthConnection, EthConnection } from '@darkforest_eth/network';
import type { Contract, providers, Wallet } from 'ethers';

/**
 * Loads the game contract, which is responsible for updating the state of the game.
 */
export async function loadDiamondContract<T extends Contract>(
  address: string,
  provider: providers.JsonRpcProvider,
  signer?: Wallet
): Promise<T> {
  const abi = await fetch(diamondContractAbiUrl).then((r) => r.json());

  return createContract<T>(address, abi, provider, signer);
}

/**
 * Loads the faucet contract, which is responsible for dripping funds to players
 */
export async function loadFaucetContract<T extends Contract>(
  address: string,
  provider: providers.JsonRpcProvider,
  signer?: Wallet
): Promise<T> {
  const abi = await fetch(faucetContractAbiUrl).then((r) => r.json());

  return createContract<T>(address, abi, provider, signer);
}

/**
 * Loads the init contract, which is responsible for initializing lobbies
 */
export async function loadInitContract<T extends Contract>(
  address: string,
  provider: providers.JsonRpcProvider,
  signer?: Wallet
): Promise<T> {
  const abi = await fetch(initContractAbiUrl).then((r) => r.json());

  return createContract<T>(address, abi, provider, signer);
}

const isProdNetwork = NETWORK.toString() !== 'localhost' && NETWORK.toString() !== 'hardhat';

export function getEthConnection(): Promise<EthConnection> {
  const network = getNetwork();

  let url: string;
  if (isProdNetwork) {
    url = localStorage.getItem('XDAI_RPC_ENDPOINT_v5') || network.httpRpc;
  } else {
    url = hardhat.httpRpc;
  }

  console.log(`GAME METADATA:`);
  console.log(`rpc url: ${url}`);
  console.log(`is production network: ${isProdNetwork}`);
  console.log(`client build: ${process.env.NODE_ENV}`);
  console.log(`server url: ${network.serverUrl}`);
  console.log(`graph url: ${network.graphUrl}`);
  return createEthConnection(url);
}

export function getNetwork(): Network {
  if (isProdNetwork) {
    return networks.find((n) => n.name === NETWORK) || hardhat;
  } else {
    return hardhat;
  }
}
