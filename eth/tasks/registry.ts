import { task } from 'hardhat/config';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { runScript, writeToContractsPackage } from '../utils/deploy';
import { CONTRACT_ADDRESS } from '@darkforest_eth/contracts';

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
  console.log('appended Registry address to contracts');

  const registryContract = await hre.ethers.getContractAt('DFArenaRegistry', registry.address);
  console.log('owner', await registryContract.contractOwner());

  await runScript('yarn workspace @darkforest_eth/contracts build');
}

// Add / remove admin
task('registry:addAdmin', 'add an admin to the registry')
  .addParam('admin', 'address of admin')
  .setAction(addAdmin);

async function addAdmin(args: { admin: string }, hre: HardhatRuntimeEnvironment) {
  try {
    await hre.run('utils:assertChainId');

    if (!hre.contracts.REGISTRY_ADDRESS) throw new Error('Registry address not found');

    const contract = await hre.ethers.getContractAt(
      'DFArenaRegistry',
      hre.contracts.REGISTRY_ADDRESS
    );

    const txReceipt = await contract.setAdmin(args.admin, true);
    await txReceipt.wait();
    const admins = await contract.getAllAdmins();
    console.log(`Added admin`, admins[admins.length - 1]);
  } catch (error) {
    console.log('Add admin failed', error);
  }
}

// Add GrandPrix
task(`registry:addGrandPrix`, `add a grand prix to the registry`)
  .addParam('configHash', 'map config hash', undefined)
  .setAction(addGrandPrix);

async function addGrandPrix(args: { configHash: string }, hre: HardhatRuntimeEnvironment) {
  try {
    await hre.run('utils:assertChainId');

    if (!hre.contracts.REGISTRY_ADDRESS) throw new Error('Registry address not found');

    const contract = await hre.ethers.getContractAt(
      'DFArenaRegistry',
      hre.contracts.REGISTRY_ADDRESS
    );

    console.log(`[REGISTRY] adding grand prix...`);
    const tx = await contract.addGrandPrix(
      Math.floor(Date.now() / 1000),
      Math.floor(Date.now() / 1000) + 172800, // two days in seconds 172800
      args.configHash,
      CONTRACT_ADDRESS,
      1
    );

    await tx.wait();
    const prixs = await contract.getAllGrandPrix();
    console.log(`Added grand prix`, prixs[prixs.length - 1]);
  } catch (error) {
    console.log('Add admin failed', error);
  }
}

task(`registry:removeGrandPrix`, `mark a grand prix as deleted from registry`)
  .addParam('configHash', 'map config hash', undefined)
  .setAction(removeGrandPrix);

async function removeGrandPrix(args: { configHash: string }, hre: HardhatRuntimeEnvironment) {
  try {
    await hre.run('utils:assertChainId');

    if (!hre.contracts.REGISTRY_ADDRESS) throw new Error('Registry address not found');

    const contract = await hre.ethers.getContractAt(
      'DFArenaRegistry',
      hre.contracts.REGISTRY_ADDRESS
    );

    console.log(`[REGISTRY] removing grand prix...`);
    const tx = await contract.removeGrandPrix(args.configHash);

    await tx.wait();
    const prixs = await contract.getAllGrandPrix();
    console.log(`removed grand prix`, prixs);
  } catch (error) {
    console.log('Add admin failed', error);
  }
}

// Remove Grand Prix
// task(`registry:removeGrandPrix`, `remove a grand prix from the registry`);
