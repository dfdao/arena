import { EthAddress, TooltipName } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getRank, Rank } from '../../Backend/Utils/Rank';
import dfstyles from '../Styles/dfstyles';
import { useUIManager } from '../Utils/AppHooks';
import { formatDuration } from '../Utils/TimeUtils';

const newYearsUnix = 1704067200;

const update = () => {
  const timeInS = Date.now() / 1000;
  const timeUntilNewYears = newYearsUnix - timeInS;
  // Format time in dd-hh-mm-ss
  const timeString = new Date(timeUntilNewYears * 1000);
  const days = timeString.getUTCDate() - 1;
  const hours = timeString.getUTCHours();
  const minutes = timeString.getUTCMinutes();
  const seconds = timeString.getUTCSeconds();
  const Datow = `${days < 10 ? `0${days}` : days}:${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
  return Datow;
};

export function Countdown() {
  const [time, setTime] = useState(update());

  function CountDown() {
    useEffect(() => {
      const interval = setInterval(() => {
        setTime(update());
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    return <>{time ? <span>{time}</span> : null}</>;
  }

  return (
    <>
      <CountDown />
    </>
  );
}
