export enum Chains {
  Hardhat = 'localhost',
  Specular = 'specular',
  Gnosis = 'gnosis',
}
export interface Network {
  name: Chains;
  chainId: number;
  wsRpc?: string;
  httpRpc: string;
  blockExplorer?: string;
  graphUrl?: string;
  serverUrl?: string;
  faucetDrip?: number;
  graphNetwork: string;
  gasLimit?: number;
}
export const specular: Network = {
  name: Chains.Specular,
  chainId: 93481,
  wsRpc: 'wss://devnet.specular.network/ws',
  httpRpc: 'https://devnet.specular.network',
  blockExplorer: 'https://explorer.specular.network',
  graphUrl: 'https://graph.devnet.specular.network/subgraphs/name/arena_5',
  faucetDrip: 0.005,
  serverUrl: 'https://server.dfdao.org',
  graphNetwork: 'speculardev',
  gasLimit: 15_000_000,
};

export const hardhat: Network = {
  name: Chains.Hardhat,
  chainId: 31337,
  httpRpc: 'http://localhost:8545',
  serverUrl: 'http://localhost:3000',
  faucetDrip: 0.005,
  graphNetwork: 'optimism',
  graphUrl: 'http://localhost:8000/subgraphs/name/df',
  gasLimit: 15_000_000,
};

export const gnosis: Network = {
  name: Chains.Gnosis,
  chainId: 100,
  httpRpc: 'https://rpc.gnosis.gateway.fm',
  serverUrl: '',
  faucetDrip: 0.25,
  graphNetwork: 'gnosis',
  graphUrl: '',
  gasLimit: 30_000_000,
};

export const GNOSIS_OPTIMISM_CHAIN_ID = 300 as const;
export const KOVAN_OPTIMISM_CHAIN_ID = 69 as const;
export const GNOSIS_CHAIN_ID = 100 as const;

/**
 * This should be updated every round.
 */
export const THEGRAPH_API_URL = 'https://graph-optimism.gnosischain.com/subgraphs/name/arena/test';
export const networks = [specular, hardhat];
