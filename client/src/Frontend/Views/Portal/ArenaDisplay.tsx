import { getConfigName } from '@darkforest_eth/procedural';
import { GraphArena } from '@darkforest_eth/types';
import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { convertGraphConfig } from '../../../Backend/Network/GraphApi/ConfigApi';
import { Minimap } from '../../Components/Minimap';
import { TextPreview } from '../../Components/TextPreview';
import { generateMinimapConfig } from '../../Panes/Lobby/MinimapUtils';
import { LobbyInitializers } from '../../Panes/Lobby/Reducer';
import { useConfigFromContract } from '@Utils/AppHooks';

const mapSize = '125px';

function ArenaCard({ arena }: { arena: GraphArena }) {
  const { config, error } = useConfigFromContract(arena.configHash);
  const lastPlayed = new Date(arena.startTime * 1000);
  const formattedDate = `${lastPlayed.getMonth() + 1}/${
    lastPlayed.getDate() + 1
  }/${lastPlayed.getFullYear()}`;
  return (
    <Link
      to={`/portal/map/${arena.configHash}`}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '50%',
        background: 'rgba(255, 255, 255, 0.04)',
        padding: '5px',
        gap: '5px',
      }}
    >
      {config && (
        <Minimap
          style={{ height: mapSize, width: mapSize }}
          minimapConfig={generateMinimapConfig(config, 10)}
        />
      )}

      <DetailsContainer>
        <div style={{ fontSize: '1.5em' }}>{getConfigName(arena.configHash)}</div>
        <TextPreview text={arena.configHash} unFocusedWidth={'100px'} focusedWidth='150px' />
        {/* <span>Games: {arena.count}</span> */}
        <span>Last played: {formattedDate}</span>
      </DetailsContainer>
    </Link>
  );
}

export function ArenaDisplay({ arenas }: { arenas: { arena: GraphArena }[] | undefined }) {
  if (!arenas) return <></>;
  const finalArenas = arenas.map((a) => a.arena);

  return (
    <MapInfoContainer>
      {finalArenas.map((arena) => (
        <ArenaCard arena={arena} key={`arena-${arena.startTime}-${arena.configHash}`} />
      ))}
    </MapInfoContainer>
  );
}

const MapInfoContainer = styled.div`
  display: flex;
  flex: 1 1;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
  padding: 10px;
  gap: 10px;
  overflow: scroll;
`;

const ArenaCardContainer = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  background: 'rgba(255, 255, 255, 0.04)',
};

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin-top: 4px;
  margin-bottom: 4px;
`;
