import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { Chain, configureChains, createConfig, WagmiConfig } from 'wagmi';
import { chainId } from '@dfdao/registry/deployment.json';
import { publicProvider } from 'wagmi/providers/public';
import { hardhat, specular } from '@darkforest_eth/constants';

window.global ||= window;

export const localHost: Chain = {
  id: 31337,
  name: 'Hardhat',
  network: 'Local Node',
  rpcUrls: {
    default: { http: [hardhat.httpRpc] },
    public: { http: [hardhat.httpRpc] },
  },
  testnet: true,
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
};

export const specularNetwork: Chain = {
  id: specular.chainId,
  name: 'Specular',
  network: 'Specular',
  rpcUrls: {
    default: { http: [specular.httpRpc] },
    public: { http: [specular.httpRpc] },
  },
  testnet: true,
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
};

export const optimisticGnosis: Chain = {
  id: 300,
  name: 'Optimism on Gnosis',
  network: 'Optimism on Gnosis Chain',
  nativeCurrency: {
    decimals: 18,
    name: 'xDAI',
    symbol: 'xDAI',
  },
  rpcUrls: {
    default: { http: ['https://optimism.gnosischain.com'] },
    public: { http: ['https://optimism.gnosischain.com'] },
  },
  blockExplorers: {
    default: {
      name: 'BlockScout',
      url: 'https://blockscout.com/xdai/optimism',
    },
  },
  testnet: false,
};

const chainFromId = [localHost, optimisticGnosis, specularNetwork].find((c) => c.id === chainId);
console.log(`connecting to`, chainFromId);
if (!chainFromId) throw new Error(`no chain found for id ${chainId}`);

const { chains, publicClient } = configureChains([chainFromId], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: 'dfdao Dynasty',
  chains,
  projectId: '23b53186cb9966aaf6e22b1f472154c1',
});

const appConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig config={appConfig}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
