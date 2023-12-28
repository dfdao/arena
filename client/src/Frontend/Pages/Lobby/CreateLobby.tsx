import { CONTRACT_ADDRESS } from '@darkforest_eth/contracts';
import { address } from '@darkforest_eth/serde';
import { EthAddress } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ArenaCreationManager } from '../../../Backend/GameLogic/ArenaCreationManager';
import { LobbyInitializers } from '../../Panes/Lobby/Reducer';
import { useConfigFromContract, useEthConnection } from '../../Utils/AppHooks';
import { stockConfig } from '../../Utils/StockConfigs';
import { CadetWormhole } from '../../Views/CadetWormhole';
import LoadingPage from '../LoadingPage';
import { LobbyConfigPage } from './LobbyConfigPage';
import { PortalHeader } from '../../Views/Portal/Components/PortalHeader';

type ErrorState =
  | { type: 'invalidAddress' }
  | { type: 'contractLoad' }
  | { type: 'invalidContract' };

export function CreateLobby({ match, location }: RouteComponentProps<{ contract: string }>) {
  const [arenaCreationManager, setArenaCreationManager] = useState<
    ArenaCreationManager | undefined
  >();
  const [startingConfig, setStartingConfig] = useState<LobbyInitializers | undefined>();
  const contractAddress: EthAddress = address(CONTRACT_ADDRESS);
  const configContractAddress = address(match.params.contract) || contractAddress;
  const [errorState, setErrorState] = useState<ErrorState | undefined>(
    contractAddress ? undefined : { type: 'invalidAddress' }
  );

  const connection = useEthConnection();

  const params = new URLSearchParams(location.search);
  const configHashParam = params.get('configHash') || undefined;

  const { config, error } = useConfigFromContract(configHashParam);

  // when connected
  useEffect(() => {
    if (contractAddress && !arenaCreationManager) {
      ArenaCreationManager.create(connection, contractAddress)
        .then((creationManager) => setArenaCreationManager(creationManager))
        .catch((e) => {
          console.log(e);
          setErrorState({ type: 'contractLoad' });
        });
    }
  }, [contractAddress]);

  useEffect(() => {
    if (error) {
      console.log(`[ERROR]`, error);
      setStartingConfig(stockConfig.vanilla);
    } else if (config) {
      setStartingConfig(config);
    }
  }, [config, error]);

  if (errorState) {
    switch (errorState.type) {
      case 'contractLoad':
        return <CadetWormhole imgUrl='/public/img/wrong-text.png' />;
      case 'invalidAddress':
      case 'invalidContract':
        return <CadetWormhole imgUrl='/public/img/no-contract-text.png' />;
      default:
        // https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking
        const _exhaustive: never = errorState;
        return _exhaustive;
    }
  }

  if (startingConfig && arenaCreationManager) {
    return (
      <>
        <PortalHeader />
        <LobbyConfigPage
          arenaCreationManager={arenaCreationManager}
          startingConfig={startingConfig}
          root={`/arena/${configContractAddress}`}
        />
      </>
    );
  } else {
    return <LoadingPage />;
  }
}
