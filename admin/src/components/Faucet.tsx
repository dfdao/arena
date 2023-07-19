import React, { useState } from 'react';
import styled from 'styled-components';
import { useAccount, useContractRead } from 'wagmi';
import { FAUCET_ADDRESS, NETWORK } from '@darkforest_eth/contracts';
import abi from '@darkforest_eth/contracts/abis/DFArenaFaucet.json';
import { networks } from '@darkforest_eth/constants';

import { TextInput } from './NewRoundForm';
import { formatEther } from 'viem';

export const Faucet = () => {
  const { isConnected, address } = useAccount();

  const network = networks.find((n) => n.name == NETWORK);
  if (!network) return <></>;

  const { data: dripAmount } = useContractRead({
    address: FAUCET_ADDRESS,
    abi,
    functionName: 'getDripAmount',
  });

  const { data: balance } = useContractRead({
    address: FAUCET_ADDRESS,
    abi,
    functionName: 'getBalance',
  });

  const { data: owner } = useContractRead({
    address: FAUCET_ADDRESS,
    abi,
    functionName: 'getOwner',
  });

  return (
    <div>
      <h3>
        <a href={`${network.blockExplorer}/address/${FAUCET_ADDRESS}`} target='_blank'>
          Faucet
        </a>
      </h3>
      {!!balance && <p>Balance: {formatEther(balance as bigint)} eth</p>}
      {!!dripAmount && <p>Drip amount: {formatEther(dripAmount as bigint)} eth</p>}
      {!!owner && <p>Owner: {owner as string}</p>}
    </div>
  );
};

const StyledInput = styled(TextInput)`
  display: flex;
  flex: 1;
  color: #fff;
`;

const InputWithButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px;
  border: 1px solid rgb(53, 71, 73);
  position: relative;
`;
