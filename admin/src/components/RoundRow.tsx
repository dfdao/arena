import React from 'react';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { formatStartTime } from '../lib/date';
import { RoundItem, TableCell } from './RoundList';
import { abi } from '@dfdao/registry/abi/Registry.json';
import { registry } from '@dfdao/registry/deployment.json';
import { RoundResponse } from '../types';
import { getConfigName } from '@darkforest_eth/procedural';

export const RoundRow: React.FC<{ round: RoundResponse }> = ({ round }) => {
  const { isConnected } = useAccount();

  const { config } = usePrepareContractWrite({
    address: registry as `0x${string}`,
    abi,
    functionName: 'deleteRound',
    args: [round.configHash],
  });

  const { write: deleteRound } = useContractWrite(config);

  return (
    <RoundItem key={round.configHash}>
      <TableCell>{getConfigName(round.configHash)}</TableCell>
      <TableCell>{formatStartTime(Number(round.startTime))}</TableCell>
      <TableCell>{formatStartTime(Number(round.endTime))}</TableCell>
      <TableCell>{Number(round.seasonId)}</TableCell>
      <TableCell>
        <button
          className='btn'
          onClick={async () => {
            deleteRound?.();
          }}
          disabled={!isConnected}
        >
          Delete
        </button>
      </TableCell>
    </RoundItem>
  );
};
