import React from 'react';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { abi } from '@dfdao/registry/abi/Registry.json';
import { registry } from '@dfdao/registry/deployment.json';
import { RoundItem, TableCell } from './RoundList';

export const AdminRow: React.FC<{ admin: string }> = ({ admin }) => {
  const { address, isConnected } = useAccount();
  const { config: deleteAdminConfig } = usePrepareContractWrite({
    address: registry as `0x${string}`,
    abi,
    functionName: 'setAdmin',
    args: [admin, false],
    enabled: admin === address,
  });
  const { write: deleteAdmin } = useContractWrite(deleteAdminConfig);
  return (
    <RoundItem key={admin}>
      <TableCell>
        {admin}
        {admin === address && <span style={{ fontWeight: 600 }}> (you)</span>}
      </TableCell>
      <TableCell>
        <button
          className='btn'
          disabled={!isConnected}
          onClick={() => {
            deleteAdmin?.();
          }}
        >
          Revoke
        </button>
      </TableCell>
    </RoundItem>
  );
};
