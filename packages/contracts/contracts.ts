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
export const NETWORK = 'gnosis';
/**
 * The id of the network where these contracts are deployed.
 */
export const NETWORK_ID = 100;
/**
 * The block in which the DarkForest contract was initialized.
 */
export const START_BLOCK = 31674157;
/**
 * The address for the DarkForest contract.
 */
export const CONTRACT_ADDRESS = '0xEF1097a295Bac6785994Afb633Cd59074EA5BEeD';
/**
 * The address for the initalizer contract. Useful for lobbies.
 */
export const INIT_ADDRESS = '0x6eBcDbc829F990201929998E79Ef9B542eabbdF3';
/**
 * The address for the Verifier library. Useful for lobbies.
 */
export const VERIFIER_ADDRESS = '0x114CF051bBaeFa291159FbD5f3626D249cF5503e';
/**
 * The address for the LibGameUtils library. Useful for lobbies.
 */
export const LIB_GAME_UTILS_ADDRESS = '0xCE58c3e5E6E98f525bC314f72D027d5a824ccA51';
/**
 * The address for the LibPlanet library. Useful for lobbies.
 */
export const LIB_PLANET_ADDRESS = '0x068429B59083dC1e6aD46dDE393fC904D4C0f1AE';
/**
 * The address for the LibArtifacts library. Useful for lobbies.
 */
export const LIB_ARTIFACT_UTILS_ADDRESS = '0x0Ab5c1d20DC99D846e48CF3B43d981f621C40972';
