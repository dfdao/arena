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

/**
 * The name of the network where these contracts are deployed.
 */
export const NETWORK = 'specular';
/**
 * The id of the network where these contracts are deployed.
 */
export const NETWORK_ID = 93481;
/**
 * The block in which the DarkForest contract was initialized.
 */
export const START_BLOCK = 34788;
/**
 * The address for the DarkForest contract.
 */
export const CONTRACT_ADDRESS = '0xe772AAc93C69Ce1ef087963aEF0747B41EdB2258';
/**
 * The address for the initalizer contract. Useful for lobbies.
 */
export const INIT_ADDRESS = '0xB9651f89230310240571478fC2bec08a371Fe709';
/**
 * The address for the Verifier library. Useful for lobbies.
 */
export const VERIFIER_ADDRESS = '0x206490d1F72e9c2CF5Fe8149E41e3Aa845232db1';
/**
 * The address for the LibGameUtils library. Useful for lobbies.
 */
export const LIB_GAME_UTILS_ADDRESS = '0x3172676A1cfdAd5aE886076a73D10d140A97F650';
/**
 * The address for the LibPlanet library. Useful for lobbies.
 */
export const LIB_PLANET_ADDRESS = '0xCdb3B2675B4f44373f1476f4B0596ff3047C87F5';
/**
 * The address for the LibArtifacts library. Useful for lobbies.
 */
export const LIB_ARTIFACT_UTILS_ADDRESS = '0x2b3a421BaF59113Ed14268b9522232E3FcB0F442';
