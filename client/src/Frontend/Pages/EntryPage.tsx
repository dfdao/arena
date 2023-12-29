import { CONTRACT_ADDRESS } from '@darkforest_eth/contracts';
import { EthConnection } from '@darkforest_eth/network';
import { address } from '@darkforest_eth/serde';
import { CleanConfigPlayer, GrandPrixMetadata } from '@darkforest_eth/types';
import React, { useEffect, useRef, useState } from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch, useHistory } from 'react-router-dom';
import { getActive, logOut } from '../../Backend/Network/AccountManager';
import { getEthConnection } from '../../Backend/Network/Blockchain';
import { loadRegistry } from '../../Backend/Network/GraphApi/GrandPrixApi';
import { loadAllPlayerData } from '../../Backend/Network/GraphApi/SeasonLeaderboardApi';
import { getAllDiscords, sendDrip } from '../../Backend/Network/UtilityServerAPI';
import { AddressTwitterMap } from '../../_types/darkforest/api/UtilityServerAPITypes';
import {
  EthConnectionProvider,
  LoadingStatus,
  SeasonDataProvider,
  SeasonPlayerProvider,
  TwitterProvider,
} from '../Utils/AppHooks';
import { PortalMainView } from '../Views/Portal/PortalMainView';
import { TerminalHandle } from '../Views/Terminal';
import { GameLandingPage } from './Game/GameLandingPage';
import LoadingPage from './LoadingPage';
import { CreateLobby } from './Lobby/CreateLobby';
import { NotFoundPage } from './NotFoundPage';
import { EntryPageTerminal, Login } from './Login';

const defaultAddress = address(CONTRACT_ADDRESS);

export function EntryPage() {
  const terminal = useRef<TerminalHandle>();
  const history = useHistory();
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>('loading');
  const [controller, setController] = useState<EntryPageTerminal | undefined>();

  const [twitters, setTwitters] = useState<AddressTwitterMap>({});
  const twitterContext = { twitters, setTwitters };

  const [connection, setConnection] = useState<EthConnection | undefined>();
  const [seasonPlayers, setPlayers] = useState<CleanConfigPlayer[]>([]);
  const seasonPlayerContext = { allPlayers: seasonPlayers, setPlayers };

  const [seasonData, setSeasonData] = useState<GrandPrixMetadata[] | undefined>();

  /* get all twitters on page load */

  useEffect(() => {
    getAllDiscords().then((t) => setTwitters(t));
  }, []);

  /* set connection on page load */
  useEffect(() => {
    async function getConnection() {
      try {
        const connection = await getEthConnection();
        setConnection(connection);
        setLoadingStatus('complete');
      } catch (e) {
        alert('error connecting to blockchain');
        console.log(e);
      }
    }
    getConnection();
  }, []);

  /* get all season data on page load */
  useEffect(() => {
    if (connection) {
      loadRegistry(connection)
        .then((t) => {
          setSeasonData(t);
        })
        .catch((e) => {
          console.log(`load registry error`, e);
          setSeasonData([]);
        });
    }
  }, [connection]);

  useEffect(() => {
    if (seasonData) {
      loadAllPlayerData(seasonData).then((t) => setPlayers(t));
    }
  }, [seasonData]);

  /* once connection is set, get active player from local storage and set account */
  useEffect(() => {
    async function setPlayer(ethConnection: EthConnection) {
      const active = getActive();
      try {
        if (!!active) {
          await sendDrip(ethConnection, active.address, terminal.current);
          await ethConnection.setAccount(active.privateKey);
          console.log(`[CONNECTING TO ACCOUNT]`, active.address);
          setLoadingStatus('complete');
        } else {
          setLoadingStatus('creating');
        }
      } catch (e) {
        // alert('Unable to connect to active account. Please login into another.');
        console.error('Unable to connect to active account. Please login into another.');
        logOut();
      }
    }
    if (connection) {
      setPlayer(connection);
    }
  }, [connection]);

  useEffect(() => {
    console.log(
      `STATUS: Connection: ${!!connection ? '✅' : '❌'}. Twitters: ${
        !!twitters ? '✅' : '❌'
      }. Season Data: ${!!seasonData ? '✅' : '❌'}. Loading Status: ${loadingStatus}`
    );
  }, [connection, twitters, seasonData, loadingStatus]);

  if (!connection || !twitters || !seasonData || loadingStatus == 'loading') {
    return <LoadingPage />;
  } else
    return (
      <EthConnectionProvider value={connection}>
        <TwitterProvider value={twitterContext}>
          <SeasonDataProvider value={seasonData}>
            <SeasonPlayerProvider value={seasonPlayerContext}>
              <Router>
                <Switch>
                  <Redirect path='/play' to={`/play/${defaultAddress}`} push={true} exact={true} />
                  <Route path='/play/:contract' component={GameLandingPage} />
                  <Redirect path='/portal/tutorial' to={`/play/`} push={false} exact={true} />
                  <Route path='/portal/login' component={Login} />
                  <Route path='/portal' component={PortalMainView} />
                  <Redirect
                    path='/arena'
                    to={`/arena/${defaultAddress}`}
                    push={true}
                    exact={true}
                  />
                  <Route path='/arena/:contract' component={CreateLobby} />
                  <Route path='*' component={NotFoundPage} />
                </Switch>
              </Router>
            </SeasonPlayerProvider>
          </SeasonDataProvider>
        </TwitterProvider>
      </EthConnectionProvider>
    );
}
