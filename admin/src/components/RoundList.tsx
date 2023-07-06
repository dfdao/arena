import '../App.css';
import styled from 'styled-components';
import { useContractRead } from 'wagmi';
import { abi } from '@dfdao/registry/abi/Registry.json';
import { registry } from '@dfdao/registry/deployment.json';
import { Registry } from '@dfdao/registry/types/Registry';
import { constants, ethers, utils } from 'ethers';
import { RoundRow } from './RoundRow';
import { RoundResponse } from '../types';

export const RoundList: React.FC = () => {
  const {
    data: roundData,
    isError,
    isLoading,
  } = useContractRead({
    address: registry as `0x${string}`,
    abi,
    functionName: 'getAllGrandPrix',
    watch: true,
  });

  if (!roundData || isLoading) return <div>Loading...</div>;
  // @ts-expect-error round data type
  if (roundData.filter((r) => r.parentAddress !== constants.AddressZero).length === 0)
    return (
      <div style={{ fontFamily: 'Menlo, monospace', textTransform: 'uppercase' }}>
        No rounds found.
      </div>
    );
  if (isError) return <div>Couldn't load previous rounds.</div>;

  return (
    <RoundsContainer>
      <thead>
        <tr>
          <TableHeader>Name</TableHeader>
          <TableHeader>Start</TableHeader>
          <TableHeader>End</TableHeader>
          <TableHeader>Season</TableHeader>
        </tr>
      </thead>
      <tbody>
        {roundData
          // @ts-expect-error round data type
          .filter((r) => r.parentAddress !== ethers.constants.AddressZero)
          .sort((a: RoundResponse, b: RoundResponse) => Number(a.startTime) - Number(b.startTime))
          .map((round: RoundResponse, i: number) => (
            <RoundRow round={round} key={i} />
          ))}
      </tbody>
    </RoundsContainer>
  );
};

export const TableHeader = styled.th`
  font-family: 'Menlo', 'Inconsolata', monospace;
  text-transform: uppercase;
  font-weight: 400;
  color: rgb(100, 115, 120);
  margin-bottom: 1rem;
  text-align: left;
  padding: 8px 16px;
`;

export const RoundsContainer = styled.div`
  border-collapse: collapse;
  display: block;
  border-spacing: 0;
  font-size: 1rem;
  overflow-y: auto;
`;

export const RoundItem = styled.tr`
  border: 1px solid rgb(53, 71, 73);
  width: 100%;
  transition: all 0.2s ease;
  &:hover {
    background: rgb(32, 36, 37);
  }
`;

export const TableCell = styled.td`
  padding: 8px 16px;
  text-align: left;
`;
