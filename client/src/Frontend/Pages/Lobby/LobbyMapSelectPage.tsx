import { EthAddress, WorldCoords } from '@darkforest_eth/types';
import React, { CSSProperties, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Spacer } from '../../Components/CoreUI';
import { Minimap } from '../../Components/Minimap';
import { ConfigUpload } from '../../Panes/Lobby/LobbiesUtils';
import { generateMinimapConfig } from '../../Panes/Lobby/MinimapUtils';
import { LobbyAction, lobbyConfigInit, LobbyInitializers } from '../../Panes/Lobby/Reducer';
import { stockConfig } from '../../Utils/StockConfigs';

interface map {
  title: string;
  initializers: LobbyInitializers;
  description: string;
}

const stockMaps: map[] = [
  {
    title: '(1P) Grand Prix',
    initializers: stockConfig.onePlayerRace,
    description: "Try this week's competitive event!",
  },
  {
    title: '(4P) Battle for the Center',
    initializers: stockConfig.fourPlayerBattle,
    description: 'Win the planet in the center!',
  },
  {
    title: '(2P) Race',
    initializers: stockConfig.sprint,
    description: 'Sprint for the target!',
  },
  {
    title: 'Custom',
    initializers: stockConfig.vanilla,
    description: 'Design your own game',
  },
];

const MapItemComponent: React.FC<{
  mapContent: map;
  idx: number;
  pickMap: (initializers: LobbyInitializers, active?: number) => void;
}> = ({ mapContent, idx, pickMap }) => {
  const [currentPointer, setCurrentPointer] = useState<WorldCoords | undefined>();
  const mapSizePx = '250px';

  return (
    <MapItem
      onClick={() => pickMap(mapContent.initializers, idx)}
      style={
        {
          '--x': currentPointer?.x,
          '--y': currentPointer?.y,
        } as CSSProperties
      }
      onMouseMove={(e: any) => {
        const x = e.clientX - e.target.offsetLeft;
        const y = e.clientY - e.target.offsetTop;
        setCurrentPointer({ x: x, y: y });
      }}
    >
      <MapContent>
        <Minimap
          style={{ height: mapSizePx, width: mapSizePx }}
          minimapConfig={generateMinimapConfig(mapContent.initializers)}
        />
        <Spacer height={32} />
        <MapItemText>
          <MapTitle>{mapContent.title}</MapTitle>
          <span>{mapContent.description}</span>
          <span>Radius: {mapContent.initializers.WORLD_RADIUS_MIN}</span>
        </MapItemText>
      </MapContent>
    </MapItem>
  );
};
const MemoMapItemComponent = React.memo(MapItemComponent);

export const LobbyMapSelectPage: React.FC<{
  address: EthAddress;
  startingConfig: LobbyInitializers;
  updateConfig: React.Dispatch<LobbyAction>;
  createDisabled: boolean;
  root: string;
  setError: (error: string) => void;
}> = ({ address, startingConfig, updateConfig, createDisabled, root, setError }) => {
  const history = useHistory();

  function pickMap(initializers: LobbyInitializers, active?: number) {
    updateConfig({ type: 'RESET', value: lobbyConfigInit(initializers) });
    history.push(`${root}/confirm`);
  }
  return (
    <Container>
      <Header>
        <Title>Create a new Arena </Title>
      </Header>
      <MapsContainer>
        {stockMaps.map((mapContent, idx) => (
          <MemoMapItemComponent
            key={`map-item-${idx}`}
            mapContent={mapContent}
            idx={idx}
            pickMap={pickMap}
          />
        ))}
      </MapsContainer>
      <ConfigUpload
        renderer={() => (
          <UploadCustomMapContainer disabled={createDisabled}>
            <span>Upload custom map (JSON)</span>
          </UploadCustomMapContainer>
        )}
        disabled={createDisabled}
        onError={setError}
        onUpload={pickMap}
      />
    </Container>
  );
};

const Title = styled.span`
  font-size: 24px;
  letter-spacing: 0.06em;
  color: #fff;
  text-transform: uppercase;
`;

const Container = styled.div`
  height: 100%;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 12px;
  background: 1f1f1f;
`;

const Header = styled.div`
  position: relative;
  aspect-ratio: 1600/200;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  margin-bottom: 6px;
`;

const UploadCustomMapContainer = styled.div<{ disabled: boolean }>`
  color: #fff;
  padding: 12px;
  display: flex;
  align-items: center;
  margin-top: 12px;
  justify-content: center;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  border-radius: 3px;
  width: 100%;
  transition: 0.2s all ease-in-out;
  &:hover {
    background: #252525;
  }
`;

const MapItemText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const MapsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 32px;
`;

const MapTitle = styled.span`
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
`;

const MapContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  z-index: 2;
  background: #252525;
  border-radius: inherit;
  position: absolute;
  inset: 2px;
  padding: 16px;
`;

const MapItem = styled.div`
  --x-px: calc(var(--x) * 1px);
  --y-px: calc(var(--y) * 1px);
  cursor: pointer;
  border-radius: 4px;
  aspect-ratio: 3/4;
  background: #252525;
  position: relative;
  overflow: hidden;
  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    inset: 0px;
    border-radius: inherit;
    background: radial-gradient(
      900px circle at var(--x-px) var(--y-px),
      rgba(61, 210, 255, 0.1),
      transparent 40%
    );
  }

  &:before {
    z-index: 1;
  }

  &:after {
    opacity: 0;
    z-index: 2;
    transition: opacity 0.4s ease;
  }

  &:hover:after {
    opacity: 1;
  }
`;
