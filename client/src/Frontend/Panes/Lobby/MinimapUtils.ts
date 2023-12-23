import { SpaceType } from '@darkforest_eth/types';
import { hsl } from 'color';
import {
  CreatedPlanet,
  ArenaCreationManager,
} from '../../../Backend/GameLogic/ArenaCreationManager';
import { LobbyPlanet } from './LobbiesUtils';
import { LobbyInitializers } from './Reducer';
import { DarkForest } from '@darkforest_eth/contracts/typechain';
import { toNum } from '@Backend/Network/GraphApi/ConfigApi';
import { getConfigName } from '@darkforest_eth/procedural';
import { decodeCoords, decodeRevealedCoords } from '@darkforest_eth/serde';
import { BigNumber, utils } from 'ethers';

export type MinimapConfig = {
  worldRadius: number;
  // perlin
  key: number;
  scale: number;
  dot: number;
  mirrorX: boolean;
  mirrorY: boolean;
  perlinThreshold1: number;
  perlinThreshold2: number;
  perlinThreshold3: number;
  stagedPlanets: LobbyPlanet[];
  createdPlanets: CreatedPlanet[];
};

export type PlanetType = 'staged' | 'target' | 'spawn' | 'created' | undefined;
export type DrawMessage = {
  radius: number;
  dot: number;
  data: { x: number; y: number; type: SpaceType; planet: PlanetType }[];
};

export const MinimapColors = {
  stagedPlanet: `${hsl(285, 100, 60)}`,
  spawnPlanet: `${hsl(51, 100, 55)}`,
  targetPlanet: `${hsl(0, 100, 55)}`,
  createdPlanet: `${hsl(123, 100, 55)}`,
  innerNebula: `${hsl(221, 100, 35)}`,
  outerNebula: `${hsl(240, 100, 25)}`,
  deepSpace: `${hsl(245, 100, 4)}`, // deep space
  deadSpace: `${hsl(119, 100, 10)}`, // dead space
};

export function generateMinimapConfig(
  config: LobbyInitializers,
  dot: number = 10,
  arenaCreationManager: ArenaCreationManager | undefined = undefined
): MinimapConfig {
  return {
    worldRadius: config.WORLD_RADIUS_MIN,
    key: config.SPACETYPE_KEY,
    scale: config.PERLIN_LENGTH_SCALE,
    mirrorX: config.PERLIN_MIRROR_X,
    mirrorY: config.PERLIN_MIRROR_Y,
    perlinThreshold1: config.PERLIN_THRESHOLD_1,
    perlinThreshold2: config.PERLIN_THRESHOLD_2,
    perlinThreshold3: config.PERLIN_THRESHOLD_3,
    stagedPlanets: config.ADMIN_PLANETS || [],
    createdPlanets: arenaCreationManager?.planets || [],
    dot,
  } as MinimapConfig;
}

export const initPlanetsToLobbyPlanets = (
  initPlanets: Awaited<ReturnType<DarkForest['getInitializers']>>['initArgs']['INIT_PLANETS']
) => {
  return initPlanets.map((initPlanet) => {
    const { x, y } = decodeCoords({ x: initPlanet.x, y: initPlanet.y });
    const lobbyPlanet: LobbyPlanet = {
      x,
      y,
      level: toNum(initPlanet.level),
      planetType: initPlanet.planetType,
      isTargetPlanet: initPlanet.isTargetPlanet,
      isSpawnPlanet: initPlanet.isSpawnPlanet,
      blockedPlanetLocs: [],
    };
    return lobbyPlanet;
  });
};

export function generateMinimapConfigFromContract(
  inits: Awaited<ReturnType<DarkForest['getInitializers']>>,
  dot: number = 10,
  arenaCreationManager: ArenaCreationManager | undefined = undefined
): MinimapConfig {
  const config = inits.initArgs;
  return {
    worldRadius: toNum(config.WORLD_RADIUS_MIN),
    key: toNum(config.SPACETYPE_KEY),
    scale: toNum(config.PERLIN_LENGTH_SCALE),
    mirrorX: config.PERLIN_MIRROR_X,
    mirrorY: config.PERLIN_MIRROR_Y,
    perlinThreshold1: toNum(config.PERLIN_THRESHOLD_1),
    perlinThreshold2: toNum(config.PERLIN_THRESHOLD_2),
    perlinThreshold3: toNum(config.PERLIN_THRESHOLD_3),
    stagedPlanets: initPlanetsToLobbyPlanets(config.INIT_PLANETS) || [],
    createdPlanets: arenaCreationManager?.planets || [],
    dot,
  } as MinimapConfig;
}
