import { task } from 'hardhat/config';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { runScript, writeToContractsPackage } from '../utils/deploy';

task('registry:deploy', 'deploy the registry contract').setAction(deployRegistry);

async function deployRegistry(args: { value: number }, hre: HardhatRuntimeEnvironment) {
  const [deployer] = await hre.ethers.getSigners();

  const factory = await hre.ethers.getContractFactory('DFArenaRegistry');
  const registry = await factory.deploy();
  await registry.deployTransaction.wait();

  console.log(`Registry deployed to: ${registry.address}`);

  const tsContents = `
    /**
     * The address for the Faucet contract. Useful for lobbies.
     */
    export const REGISTRY_ADDRESS = '${registry.address}';
  `;

  writeToContractsPackage(hre, tsContents, `registry`);
  console.log('appended Faucet address to contracts');

  const registryContract = await hre.ethers.getContractAt('DFArenaRegistry', registry.address);
  console.log('owner', await registryContract.contractOwner());

  await runScript('yarn workspace @darkforest_eth/contracts build');
}

// Add / remove admin

// Add GrandPrix

// Remove Grand Prix
