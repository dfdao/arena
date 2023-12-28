import React from 'react';
import { Account } from '../Account';
import { theme } from '../styleUtils';
import { TabNav } from './TabNav';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useEthConnection } from '../../../Utils/AppHooks';
import { MinimalButton } from '../PortalMainView';
import { populate, populateBulk } from '../../../../Backend/Utils/Populate';
import { address } from '@darkforest_eth/serde';
import { Logo } from '../../../Panes/Lobby/LobbiesUtils';
import { CONTRACT_ADDRESS } from '@darkforest_eth/contracts';
import { PortalHelpCenter } from '../PortalHelpCenter';
import { getActive } from '@Backend/Network/AccountManager';

export const PortalHeader = () => {
  const history = useHistory();
  const connection = useEthConnection();
  const playerAddress = getActive()?.address;
  console.log(`[NAV] Player address [${playerAddress}]`);

  const tabs = [
    {
      label: 'Play',
      to: '/portal',
    },
    {
      label: 'History',
      to: `/portal/history/${playerAddress}`,
      wildcard: playerAddress,
      loggedIn: true,
    },
    {
      label: 'Create',
      to: '/arena',
      loggedIn: true,
    },
    {
      label: 'Community',
      to: `/portal/community`,
    },
    {
      label: 'Tutorial',
      to: '/play/tutorial?tutorial=true',
      blank: true,
    },
  ];

  const finalTabs = tabs.filter((t) => (t.loggedIn ? !!playerAddress : true));

  return (
    <Container>
      <TitleContainer>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            maxHeight: '56px',
            padding: '8px',
            cursor: 'pointer',
          }}
          onClick={() => history.push('/portal')}
        >
          <Logo width={56} />
        </div>
        {process.env.NODE_ENV !== 'production' ? (
          <MinimalButton
            onClick={async () => {
              await populateBulk(connection, address(CONTRACT_ADDRESS), 5);
              //await populate(connection, address(CONTRACT_ADDRESS));
            }}
          >
            Populate
          </MinimalButton>
        ) : null}
      </TitleContainer>

      <TabNav tabs={finalTabs} />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.lg,
        }}
      >
        <PortalHelpCenter />
        <Account />
      </div>
    </Container>
  );
};

const Container = styled.header`
  display: grid;
  grid-template-columns: min-content auto max-content;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: ${theme.spacing.lg};
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;
