import {
  DarkForest,
  DarkForest__arenaPlayersResultValue0Struct,
  DarkForest__getArenaConstantsResultValue0Struct,
  DarkForest__getGraphConstantsResultValue0Struct,
} from '../../generated/DarkForest/DarkForest';
import {
  Arena,
  ArenaPlanet,
  ArenaPlayer,
  Badge,
  Blocklist,
  ConfigPlayer,
  Player,
} from '../../generated/schema';
import { Address, BigInt, Bytes, dataSource, log } from '@graphprotocol/graph-ts';
import {
  bjjFieldElementToSignedInt,
  hexStringToPaddedUnprefixed,
  isDefenseBoosted,
  isEnergyCapBoosted,
  isEnergyGrowthBoosted,
  isRangeBoosted,
  isSpaceJunkHalved,
  isSpeedBoosted,
  toPlanetType,
  toSpaceType,
} from './converters';
import { MAX_INT_32 } from './constants';

export function arenaId(id: string): string {
  return `${dataSource.address().toHexString()}-${id}`;
}

export function configPlayerId(player: string, configHash: string): string {
  return `${player}-${configHash}`;
}
export function configTeamId(players: string[], configHash: string): string {
  return `${players.toString()}-${configHash}`;
}
/* 
  Standard id for arena: contract-id 
  ex Player: 0x124d0b48570adfd14ac35820e38db273caa6a694-0x1c0f0af3262a7213e59be7f1440282279d788335
*/
export function makeArenaId(contract: string, id: string): string {
  return `${contract}-${id}`;
}

export function buildPlanet(contract: DarkForest, id: string, locationDec: BigInt): ArenaPlanet {
  const planetData = contract.bulkGetPlanetsDataByIds([locationDec])[0];
  const arenaData = contract.planetsArenaInfo(locationDec);
  const locationId = hexStringToPaddedUnprefixed(locationDec);

  const planet = new ArenaPlanet(id);
  planet.locationDec = locationDec;
  planet.locationId = locationId;

  // Init planet might not always be revealed planet
  if (planetData.revealedCoords.x && planetData.revealedCoords.y) {
    planet.x = bjjFieldElementToSignedInt(planetData.revealedCoords.x);
    planet.y = bjjFieldElementToSignedInt(planetData.revealedCoords.y);
  }
  planet.perlin = planetData.info.perlin;
  planet.level = planetData.planet.planetLevel;
  planet.planetType = toPlanetType(planetData.planet.planetType);
  planet.targetPlanet = arenaData.targetPlanet;
  planet.spawnPlanet = arenaData.spawnPlanet;
  planet.capturer = null;
  // These are useful for confirming that spawn planets are fair.
  planet.isEnergyCapBoosted = isEnergyCapBoosted(locationId);
  planet.isEnergyGrowthBoosted = isEnergyGrowthBoosted(locationId);
  planet.isRangeBoosted = isRangeBoosted(locationId);
  planet.isSpeedBoosted = isSpeedBoosted(locationId);
  planet.isDefenseBoosted = isDefenseBoosted(locationId);
  planet.isSpaceJunkHalved = isSpaceJunkHalved(locationId);
  planet.spaceType = toSpaceType(planetData.info.spaceType);
  planet.captured = false;
  planet.blockedPlanetIds = arenaData.blockedPlanetIds.map<string>((x) =>
    arenaId(hexStringToPaddedUnprefixed(x))
  );
  planet.blockedPlanetHashes = arenaData.blockedPlanetIds.map<string>((x) =>
    hexStringToPaddedUnprefixed(x)
  );

  let arena = Arena.load(contract._address.toHexString());

  if (!arena) {
    log.error('attempting to attach planet to unkown arena: {}', [contract._address.toHexString()]);
    throw new Error();
  }

  planet.arena = arena.id;

  return planet;
}

export function loadArena(id: string): Arena {
  const entity = Arena.load(id);
  if (!entity) {
    log.error('attempting to load unkown arena: {}', [id]);
    throw new Error();
  }
  return entity;
}

export function loadPlayer(id: string): Player {
  const entity = Player.load(id);
  if (!entity) {
    log.error('attempting to load unkown Player: {}', [id]);
    throw new Error();
  }
  return entity;
}

export function loadArenaPlayer(id: string): ArenaPlayer {
  const entity = ArenaPlayer.load(id);
  if (!entity) {
    log.error('attempting to load unkown ArenaPlayer: {}', [id]);
    throw new Error();
  }
  return entity;
}

export function loadConfigPlayer(id: string): ConfigPlayer {
  const entity = ConfigPlayer.load(id);
  if (!entity) {
    log.error('attempting to load unkown ConfigPlayer: {}', [id]);
    throw new Error();
  }
  return entity;
}

export function loadBlocklist(id: string): Blocklist {
  const entity = Blocklist.load(id);
  if (!entity) {
    log.error('attempting to load unkown Blocklist: {}', [id]);
    throw new Error();
  }
  return entity;
}

export function loadArenaPlanet(id: string): ArenaPlanet {
  const entity = ArenaPlanet.load(id);
  if (!entity) {
    log.error('attempting to load unkown ArenaPlanet: {}', [id]);
    throw new Error();
  }
  return entity;
}

export function loadArenaConstants(): DarkForest__getArenaConstantsResultValue0Struct {
  const contract = DarkForest.bind(dataSource.address());
  let result = contract.try_getArenaConstants();
  if (result.reverted) {
    log.error('Arena Constants reverted', []);
    throw new Error();
  } else {
    return result.value;
  }
}

export function loadGraphConstants(): DarkForest__getGraphConstantsResultValue0Struct {
  const contract = DarkForest.bind(dataSource.address());
  let result = contract.try_getGraphConstants();
  if (result.reverted) {
    log.error('Graph Constants reverted', []);
    throw new Error();
  } else {
    return result.value;
  }
}

export function loadWinners(): Array<Address> {
  const contract = DarkForest.bind(dataSource.address());
  let result = contract.try_getWinners();
  if (result.reverted) {
    log.error('Winners reverted', []);
    throw new Error();
  } else {
    return result.value;
  }
}

export function loadArenaPlayerInfo(key: Address): DarkForest__arenaPlayersResultValue0Struct {
  const contract = DarkForest.bind(dataSource.address());
  let result = contract.try_arenaPlayers(key);
  if (result.reverted) {
    log.error('Winners reverted', []);
    throw new Error();
  } else {
    return result.value;
  }
}

export function loadBadge(id: string): Badge {
  const entity = Badge.load(id);
  if (!entity) {
    log.error('attempting to load unkown Badge: {}', [id]);
    throw new Error();
  }
  return entity;
}
