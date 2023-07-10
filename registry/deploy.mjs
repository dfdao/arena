#!/usr/bin/env zx

import { networks } from '@darkforest_eth/constants';
import { NETWORK } from '@darkforest_eth/contracts';

const isProdNetwork = NETWORK.toString() !== 'localhost' && NETWORK.toString() !== 'hardhat';

const getNetwork = () => {
  if (isProdNetwork) {
    return networks.find((n) => n.name === NETWORK) || hardhat;
  } else {
    return hardhat;
  }
};

function parseForgeDeploy(output) {
  const parsed = output.split('\n');
  const lineWithAddress = parsed.find((line) => line.startsWith('Contract Address:'));
  const address = lineWithAddress.split(' ')[lineWithAddress.split(' ').length - 1];
  return address;
}

const main = async () => {
  const PRIVATE_KEY = process.env.PRIVATE_KEY;
  const RPC_URL = getNetwork().httpRpc;

  const names = ['Registry', 'NFT'];
  let deployments = {};

  for await (const name of names) {
    const { stdout: deploymentOutput } =
      await $`forge script script/${name}.s.sol:Deploy${name} --rpc-url ${RPC_URL} --private-key ${PRIVATE_KEY} --legacy --broadcast`;
    const registryAddress = parseForgeDeploy(deploymentOutput);
    deployments[name.toLowerCase()] = registryAddress;
  }

  deployments['chainId'] = process.env.CHAIN_ID;

  console.log(deployments);

  fs.writeFileSync('deployment.json', JSON.stringify(deployments));
};
main().catch((e) => console.log(e));
