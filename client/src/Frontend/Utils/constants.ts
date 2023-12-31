import { address } from '@darkforest_eth/serde';
import { BadgeType, GrandPrixMetadata, WorldCoords } from '@darkforest_eth/types';
import * as bigInt from 'big-integer';
import { constants } from 'ethers';
import dfstyles from '../Styles/dfstyles';

// To developer, increase this number to 256. This, in combination with setting `DISABLE_ZK_CHECKS`
// in darkforest.toml, will make you mine the map at ULTRA SPEED!
// To code reviewer, make sure this does not change in a PR to develop!
const MIN_CHUNK_SIZE = 16;

/**
 * @tutorial to speed up the game's background rendering code, it is possible to set this value to
 * be a higher power of two. This means that smaller chunks will be merged into larger chunks via
 * the algorithms implemented in {@link ChunkUtils}.
 *
 * {@code Math.floor(Math.pow(2, 16))} should be large enough for most.
 */
const MAX_CHUNK_SIZE = 2 ** 14;

const LOCATION_ID_UB = bigInt(
  '21888242871839275222246405745257275088548364400416034343698204186575808495617'
);

const competitiveConfig = '0xfe719a3cfccf2bcfa23f71f0af80a931eda4f4197331828d728b7505a6156930';

const tutorialConfig = '0x0b1ab5e27ab1813701aad3533b0f528c832aa246aa3192c8b86dd60452cbe15b';

const tutorialAsteroidLocation: WorldCoords = { x: -8, y: -10 };

const tutorialFoundryLocation: WorldCoords = { x: 8, y: -10 };

const roundStartTimestamp = '2022-07-13T00:00:00.000Z';

const roundEndTimestamp = '2022-07-20T00:00:00.000Z';

const bronzeTime = 4500; // 80 minutes in seconds

const silverTime = 3500; // 40 minutes in seconds

const goldTime = 2500; // 20 minutes in seconds

const OPTIMISM_GAS_LIMIT = 15000000;

const MAX_ADMIN_PLANETS = 50;

const CONFIG_CONSTANTS = `config{
  # CLAIM_PLANET_COOLDOWN,
  # INIT_PLANETS,
  ABANDON_RANGE_CHANGE_PERCENT,
  ABANDON_SPEED_CHANGE_PERCENT,
  ADMIN_CAN_ADD_PLANETS,
  ARTIFACT_POINT_VALUES,
  BIOME_THRESHOLD_1,
  BIOME_THRESHOLD_2,
  BIOMEBASE_KEY,
  BLOCK_CAPTURE,
  BLOCK_MOVES,
  CAPTURE_ZONE_CHANGE_BLOCK_INTERVAL,
  CAPTURE_ZONE_COUNT,
  CAPTURE_ZONE_HOLD_BLOCKS_REQUIRED,
  CAPTURE_ZONE_PLANET_LEVEL_SCORE,
  CAPTURE_ZONE_RADIUS,
  CAPTURE_ZONES_ENABLED,
  CAPTURE_ZONES_PER_5000_WORLD_RADIUS,
  CLAIM_VICTORY_ENERGY_PERCENT,
  CONFIRM_START,
  DISABLE_ZK_CHECKS,
  INIT_PERLIN_MAX,
  INIT_PERLIN_MIN,
  LOCATION_REVEAL_COOLDOWN,
  MANUAL_SPAWN,
  MAX_NATURAL_PLANET_LEVEL,
  MODIFIERS,
  NO_ADMIN,
  NUM_TEAMS,
  PERLIN_LENGTH_SCALE,
  PERLIN_MIRROR_X,
  PERLIN_MIRROR_Y,
  PERLIN_THRESHOLD_1,
  PERLIN_THRESHOLD_2,
  PERLIN_THRESHOLD_3,
  PHOTOID_ACTIVATION_DELAY,
  PLANET_LEVEL_JUNK,
  PLANET_LEVEL_THRESHOLDS,
  PLANET_RARITY,
  PLANET_TRANSFER_ENABLED,
  PLANET_TYPE_WEIGHTS,
  PLANETHASH_KEY,
  RANDOM_ARTIFACTS,
  RANKED,
  SILVER_SCORE_VALUE,
  SPACE_JUNK_ENABLED,
  SPACE_JUNK_LIMIT,
  SPACESHIPS,
  SPACETYPE_KEY,
  SPAWN_RIM_AREA,
  START_PAUSED,
  TARGET_PLANETS,
  TARGETS_REQUIRED_FOR_VICTORY,
  TEAMS_ENABLED,
  TIME_FACTOR_HUNDREDTHS,
  TOKEN_MINT_END_TIMESTAMP,
  WHITELIST_ENABLED,
  WORLD_RADIUS_LOCKED,
  WORLD_RADIUS_MIN,
},
planets(first: ${MAX_ADMIN_PLANETS}) {
  x,
  y,
  locationDec,
  perlin,
  level,
  planetType,
  targetPlanet,
  spawnPlanet,
  blockedPlanetIds {
    locationDec
    x
    y
  }
}`;

const TEMP_START_TIME = 1597862644;
const TEMP_END_TIME = 1662588877;

// One hour
const WALLBREAKER_BONUS = 0;
const START_ENGINE_BONUS = 100;
const SLEEPY_BONUS = 24;
const TREE_BONUS = 42;
const NICE_BONUS = 69;

const BADGE_BONUSES: { [type: BadgeType]: { bonus: number; color: string } } = {};

BADGE_BONUSES[BadgeType.StartYourEngine] = {
  bonus: START_ENGINE_BONUS,
  color: dfstyles.colors.dfred,
};
BADGE_BONUSES[BadgeType.Tree] = {
  bonus: TREE_BONUS,
  color: dfstyles.colors.dfgreen,
};
BADGE_BONUSES[BadgeType.Nice] = {
  bonus: NICE_BONUS,
  color: dfstyles.colors.dfpurple,
};
BADGE_BONUSES[BadgeType.Sleepy] = {
  bonus: SLEEPY_BONUS,
  color: dfstyles.colors.dfblue,
};
BADGE_BONUSES[BadgeType.Wallbreaker] = {
  bonus: WALLBREAKER_BONUS,
  color: dfstyles.colors.dfgold,
};

const HOUR_IN_SECONDS = 60 * 60 * 2;
const DAY_IN_SECONDS = 24 * 60 * 60;
const EGP = true;
const DUMMY = false;
const DEV_CONFIG_HASH_1 = '0xd08bbeb0785370a68369f0a042e33ef2688da6da5e79acbb5688ddbb8ca4a862';
const DEV_CONFIG_HASH_2 = '0x0d6894ebcd6476be6c4ffe3ae3aaafda48b3b02c438ca481fd8836d16964a80e';

// startTime and endTime are in UNIX seconds
const SEASON_GRAND_PRIXS: GrandPrixMetadata[] = [
  {
    seasonId: 1,
    configHash: DEV_CONFIG_HASH_1,
    startTime: TEMP_START_TIME,
    endTime: TEMP_END_TIME,
    diamondAddress: address(constants.AddressZero),
    deleted: false,
  },
  {
    seasonId: 1,
    configHash: DEV_CONFIG_HASH_2,
    startTime: TEMP_START_TIME,
    endTime: TEMP_END_TIME,
    diamondAddress: address(constants.AddressZero),
    deleted: false,
  },
];

const FIRST_GRAND_PRIX: GrandPrixMetadata = {
  seasonId: 1,
  configHash: '0xcc06ae3f725ee78b9d8e7f50ce2536c360f8f982e0392a2eb4e2ed7dda4a70b3',
  startTime: 1662768000,
  endTime: 1663372800,
  diamondAddress: address(constants.AddressZero),
  deleted: false,
};

const FIRST_CONFIG_HASH_GP1 = '0xcc06ae3f725ee78b9d8e7f50ce2536c360f8f982e0392a2eb4e2ed7dda4a70b3';
const SECOND_CONFIG_HASH_GP1 = '0x2c786bdae64f8ff8f42e8cddf6f4dd49d044cba20fdf7da65a9790b475b73b9c';
const FIRST_CONFIG_FINAL_VALID_START = 1662926490;
const NERONZZ_WEEK_1 = {
  address: '0x8dc13e92246b9e9a494173f28b07262b30cc545c',
  time: 118,
};

export {
  MIN_CHUNK_SIZE,
  MAX_CHUNK_SIZE,
  OPTIMISM_GAS_LIMIT,
  LOCATION_ID_UB,
  roundEndTimestamp,
  roundStartTimestamp,
  competitiveConfig,
  tutorialConfig,
  tutorialAsteroidLocation,
  tutorialFoundryLocation,
  bronzeTime,
  silverTime,
  CONFIG_CONSTANTS,
  NERONZZ_WEEK_1,
  goldTime,
  SEASON_GRAND_PRIXS,
  WALLBREAKER_BONUS,
  START_ENGINE_BONUS,
  FIRST_CONFIG_FINAL_VALID_START,
  FIRST_CONFIG_HASH_GP1,
  SECOND_CONFIG_HASH_GP1,
  SLEEPY_BONUS,
  TREE_BONUS,
  NICE_BONUS,
  BADGE_BONUSES,
  EGP,
  DUMMY,
  DEV_CONFIG_HASH_1,
  DEV_CONFIG_HASH_2,
  HOUR_IN_SECONDS,
  FIRST_GRAND_PRIX,
  DAY_IN_SECONDS,
};

export const enum DFZIndex {
  MenuBar = 4,
  HoverPlanet = 1001,
  Modal = 1001,
  Tooltip = 16000000,
  Notification = 1000,
}
