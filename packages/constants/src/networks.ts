export enum Chains {
  Hardhat = 'HARDHAT',
  Specular = 'SPECULAR',
  Gnosis = 'GNOSIS',
}
export interface Network {
  name: Chains;
  chainId: string;
  wsRpc?: string;
  httpRpc: string;
  blockExplorer?: string;
}
export const specular: Network = {
  name: Chains.Specular,
  chainId: '93481',
  wsRpc: 'wss://devnet.specular.network/ws',
  httpRpc: 'https://devnet.specular.network',
};

export const hardhat: Network = {
  name: Chains.Hardhat,
  chainId: '31337',
  httpRpc: 'http://localhost:8545',
};
