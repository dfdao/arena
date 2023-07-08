import * as fs from 'fs';
import { HardhatRuntimeEnvironment, Libraries } from 'hardhat/types';
import * as path from 'path';
import * as prettier from 'prettier';
import { exec } from 'child_process';
import { promisify } from 'util';
import { tscompile } from '../utils/tscompile';

export async function deployDiamond(
  {
    ownerAddress,
    diamondCutAddress,
  }: {
    ownerAddress: string;
    diamondCutAddress: string;
  },
  {}: Libraries,
  hre: HardhatRuntimeEnvironment
) {
  const factory = await hre.ethers.getContractFactory('Diamond');
  const contract = await factory.deploy(ownerAddress, diamondCutAddress);
  await contract.deployTransaction.wait();
  console.log(`Diamond deployed to: ${contract.address}`);
  return contract;
}

export async function deployContract(
  facetName: string,
  libraries: Libraries,
  hre: HardhatRuntimeEnvironment
) {
  const factory = await hre.ethers.getContractFactory(facetName, {
    libraries,
  });
  const contract = await factory.deploy();
  await contract.deployTransaction.wait();
  console.log(`${facetName} deployed to: ${contract.address}`);
  return contract;
}

// Promisify the exec function
const execPromise = promisify(exec);

export async function runScript(command: string) {
  console.log(`running script`, command);
  try {
    // Execute the command
    const { stdout, stderr } = await execPromise(command);
    if (stdout) console.log(`stdout: ${stdout}`);
    if (stderr) console.log(`stdout: ${stderr}`);
  } catch (error) {
    // @ts-expect-error
    console.error(`Error: ${error.message}`);
  }
}
export function writeToContractsPackage(
  hre: HardhatRuntimeEnvironment,
  tsContents: string,
  filePath: string
) {
  const { jsContents, dtsContents } = tscompile(tsContents);

  const contractsFileTS = path.join(hre.packageDirs['@darkforest_eth/contracts'], `${filePath}.ts`);

  const options = prettier.resolveConfig.sync(contractsFileTS);

  fs.writeFileSync(
    contractsFileTS,
    prettier.format(tsContents, { ...options, parser: 'babel-ts' })
  );
}

export async function saveDeploy(
  args: {
    coreBlockNumber: number;
    diamondAddress: string;
    initAddress: string;
    libraries: Libraries;
  },
  hre: HardhatRuntimeEnvironment
) {
  const isDev = hre.network.name === 'localhost' || hre.network.name === 'hardhat';

  // Save the addresses of the deployed contracts to the `@darkforest_eth/contracts` package
  const tsContents = `
    /**
     * This package contains deployed contract addresses, ABIs, and Typechain types
     * for the Dark Forest game.
     *
     * ## Installation
     *
     * You can install this package using [\`npm\`](https://www.npmjs.com) or
     * [\`yarn\`](https://classic.yarnpkg.com/lang/en/) by running:
     *
     * \`\`\`bash
     * npm install --save @darkforest_eth/contracts
     * \`\`\`
     * \`\`\`bash
     * yarn add @darkforest_eth/contracts
     * \`\`\`
     *
     * When using this in a plugin, you might want to load it with [skypack](https://www.skypack.dev)
     *
     * \`\`\`js
     * import * as contracts from 'http://cdn.skypack.dev/@darkforest_eth/contracts'
     * \`\`\`
     *
     * ## Typechain
     *
     * The Typechain types can be found in the \`typechain\` directory.
     *
     * ## ABIs
     *
     * The contract ABIs can be found in the \`abis\` directory.
     *
     * @packageDocumentation
     */
  
    /**
     * The name of the network where these contracts are deployed.
     */
    export const NETWORK = '${hre.network.name}';
    /**
     * The id of the network where these contracts are deployed.
     */
    export const NETWORK_ID = ${hre.network.config.chainId};
    /**
     * The block in which the DarkForest contract was initialized.
     */
    export const START_BLOCK = ${isDev ? 0 : args.coreBlockNumber};
    /**
     * The address for the DarkForest contract.
     */
    export const CONTRACT_ADDRESS = '${args.diamondAddress}';
    /**
     * The address for the initalizer contract. Useful for lobbies.
     */
    export const INIT_ADDRESS = '${args.initAddress}';
    /**
     * The address for the Verifier library. Useful for lobbies.
     */
    export const VERIFIER_ADDRESS = '${args.libraries.Verifier}';
    /**
     * The address for the LibGameUtils library. Useful for lobbies.
     */
    export const LIB_GAME_UTILS_ADDRESS = '${args.libraries.LibGameUtils}';
    /**
     * The address for the LibPlanet library. Useful for lobbies.
     */
    export const LIB_PLANET_ADDRESS = '${args.libraries.LibPlanet}';
    /**
     * The address for the LibArtifacts library. Useful for lobbies.
     */
    export const LIB_ARTIFACT_UTILS_ADDRESS = '${args.libraries.LibArtifactUtils}';
    `;

  writeToContractsPackage(hre, tsContents, 'contracts');
  await runScript('yarn workspace @darkforest_eth/contracts build');
}

export async function createLobby(
  diamondAddress: string,
  diamondInitAddress: string,
  initializers: HardhatRuntimeEnvironment['initializers'],
  whitelistEnabled: boolean,
  hre: HardhatRuntimeEnvironment
): Promise<any> {
  const diamond = await hre.ethers.getContractAt('DarkForest', diamondAddress);
  const diamondInit = await hre.ethers.getContractAt('DFArenaInitialize', diamondInitAddress);
  const diamondInitFunctionCall = diamondInit.interface.encodeFunctionData('init', [
    // // @ts-expect-error
    initializers,
    {
      allowListEnabled: false,
      artifactBaseURI: '',
      allowedAddresses: [],
    },
  ]);

  const arenaTx = await diamond.createLobby(diamondInit.address, diamondInitFunctionCall);
  const rc = await arenaTx.wait();

  // @ts-expect-error
  const event = rc.events.find((event) => event.event === 'LobbyCreated');
  if (!event || !event.args) throw Error('No event found');

  const lobbyAddress = event.args.lobbyAddress as string;
  return hre.ethers.getContractAt('DarkForest', lobbyAddress);
}
