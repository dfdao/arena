"use strict";
/**
 * This package contains deployed contract addresses, ABIs, and Typechain types
 * for the Dark Forest game.
 *
 * ## Installation
 *
 * You can install this package using [`npm`](https://www.npmjs.com) or
 * [`yarn`](https://classic.yarnpkg.com/lang/en/) by running:
 *
 * ```bash
 * npm install --save @darkforest_eth/contracts
 * ```
 * ```bash
 * yarn add @darkforest_eth/contracts
 * ```
 *
 * When using this in a plugin, you might want to load it with [skypack](https://www.skypack.dev)
 *
 * ```js
 * import * as contracts from 'http://cdn.skypack.dev/@darkforest_eth/contracts'
 * ```
 *
 * ## Typechain
 *
 * The Typechain types can be found in the `typechain` directory.
 *
 * ## ABIs
 *
 * The contract ABIs can be found in the `abis` directory.
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LIB_ARTIFACT_UTILS_ADDRESS = exports.LIB_PLANET_ADDRESS = exports.LIB_GAME_UTILS_ADDRESS = exports.VERIFIER_ADDRESS = exports.INIT_ADDRESS = exports.CONTRACT_ADDRESS = exports.START_BLOCK = exports.NETWORK_ID = exports.NETWORK = void 0;
/**
 * The name of the network where these contracts are deployed.
 */
exports.NETWORK = 'localhost';
/**
 * The id of the network where these contracts are deployed.
 */
exports.NETWORK_ID = 31337;
/**
 * The block in which the DarkForest contract was initialized.
 */
exports.START_BLOCK = 0;
/**
 * The address for the DarkForest contract.
 */
exports.CONTRACT_ADDRESS = '0xAeC15AaFB61BC111c909244f6967954FE47B2f1e';
/**
 * The address for the initalizer contract. Useful for lobbies.
 */
exports.INIT_ADDRESS = '0x5c2EFa60d8c8c05f94e7C0cC0d4B17638d6727d2';
/**
 * The address for the Verifier library. Useful for lobbies.
 */
exports.VERIFIER_ADDRESS = '0x1aE9623899dDc2bB42217eF985a3d98E6E7623C1';
/**
 * The address for the LibGameUtils library. Useful for lobbies.
 */
exports.LIB_GAME_UTILS_ADDRESS = '0x6c452936A27F5Afc41bCC9Dd49a5bdedBdfA9b7A';
/**
 * The address for the LibPlanet library. Useful for lobbies.
 */
exports.LIB_PLANET_ADDRESS = '0xc2EEd1AdAAe36B640f64c06FeF8Cd32F7473afAA';
/**
 * The address for the LibArtifacts library. Useful for lobbies.
 */
exports.LIB_ARTIFACT_UTILS_ADDRESS = '0x500cf53555c09948f4345594F9523E7B444cD67E';
//# sourceMappingURL=contracts.js.map