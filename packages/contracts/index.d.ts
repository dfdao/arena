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
export declare const NETWORK = "specular";
/**
 * The id of the network where these contracts are deployed.
 */
export declare const NETWORK_ID = 93481;
/**
 * The block in which the DarkForest contract was initialized.
 */
export declare const START_BLOCK = 15989;
/**
 * The address for the DarkForest contract.
 */
export declare const CONTRACT_ADDRESS = "0x66D8192d7A194E6E61336ABBc83405Ba17899b61";
/**
 * The address for the initalizer contract. Useful for lobbies.
 */
export declare const INIT_ADDRESS = "0x35D6508dEe1aF2a41f6ccA65C70AD5401Fa1a4c9";
/**
 * The address for the Verifier library. Useful for lobbies.
 */
export declare const VERIFIER_ADDRESS = "0x36105d46Ce23E51FC961FB287cd870cc0671cd7f";
/**
 * The address for the LibGameUtils library. Useful for lobbies.
 */
export declare const LIB_GAME_UTILS_ADDRESS = "0x0c1ed2f3975CF00f0326E0C0d1BC3cf8D2396D13";
/**
 * The address for the LibPlanet library. Useful for lobbies.
 */
export declare const LIB_PLANET_ADDRESS = "0x3523FEbBcC3e86b171F1F22678911E05A46983C7";
/**
 * The address for the LibArtifacts library. Useful for lobbies.
 */
export declare const LIB_ARTIFACT_UTILS_ADDRESS = "0x103F2E96A2210e5188059d070d43120a47d621Df";
//# sourceMappingURL=index.d.ts.map