import { EthAddress, RawAccount } from '@darkforest_eth/types';
import { getGraphQLData } from '../GraphApi';
import { getNetwork } from '../Blockchain';

export async function loadAccountData(address: EthAddress): Promise<RawAccount | undefined> {
  const query = `
query {
  player(id:"${address}") {
   	wins
    matches
    arenaPlayers {
      arena{
        lobbyAddress,
        configHash,
        gameOver,
        startTime,
      }
    }
  }
}
`;
  const data = await getGraphQLData(query, getNetwork().graphUrl || 'localhost:8000');
  return data.data.player;
}
