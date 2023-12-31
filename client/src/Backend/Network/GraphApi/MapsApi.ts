import { EthAddress, MapInfo } from '@darkforest_eth/types';
import { getGraphQLData } from '../GraphApi';
import { getNetwork } from '../Blockchain';

export async function loadRecentMaps(
  nMaps?: number,
  configHash?: string,
  creator?: string
): Promise<MapInfo[] | undefined> {
  const where = configHash ? `configHash: "${configHash}"` : creator ? `creator: "${creator}"` : '';
  const query = `
	query {
		arenas(${
      nMaps ? `first:${nMaps}` : ``
    }, orderBy:creationTime, orderDirection:desc, where:{${where}} ) {
			configHash
			creator
			lobbyAddress
			startTime
			planets {
				id
			}
		}
	}
	`;

  return (await getGraphQLData(query, getNetwork().graphUrl || 'localhost:8000')).data?.arenas;
}
