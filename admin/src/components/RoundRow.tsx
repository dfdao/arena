import React from 'react';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { formatStartTime } from '../lib/date';
import { RoundItem, TableCell } from './RoundList';
import { abi } from '@dfdao/registry/abi/Registry.json';
import { registry } from '@dfdao/registry/deployment.json';
import { RoundResponse } from '../types';
import { getConfigName } from '@dfdao/procedural';

export const RoundRow: React.FC<{ round: RoundResponse }> = ({ round }) => {
  const { isConnected } = useAccount();

  const { config } = usePrepareContractWrite({
    addressOrName: registry,
    contractInterface: abi,
    functionName: 'deleteRound',
    args: [round.configHash],
  });

  const { write: deleteRound } = useContractWrite(config);

  return (
    <RoundItem key={round.configHash}>
      <TableCell>{getConfigName(round.configHash)}</TableCell>
      <TableCell>{formatStartTime(round.startTime.toNumber())}</TableCell>
      <TableCell>{formatStartTime(round.endTime.toNumber())}</TableCell>
      <TableCell>{round.seasonId.toNumber()}</TableCell>
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
