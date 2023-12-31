import { Link } from '@Components/CoreUI';
import { Countdown } from '../Countdown';
import React from 'react';
// @ts-expect-error types
import StarfieldAnimation from 'react-starfield-animation';
import styled, { keyframes } from 'styled-components';

export const Stars = () => {
  return (
    <>
      <div
        style={{
          backgroundSize: 'stretch',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column', // Set the direction to column
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <StarfieldAnimation
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}
        />
        <div
          style={{
            zIndex: 2,
            textAlign: 'center', // Center the text
          }}
        >
          <FadeInH1>
            <Countdown />
          </FadeInH1>
        </div>
        <br />
        <Link
          to={'https://discord.gg/7DMzRb9a3K'}
          style={{
            fontSize: '1.5em',
            textDecoration: 'none', // Optional, for styling
            textAlign: 'center', // Center the text,
            zIndex: 2,
          }}
        >
          Discord
        </Link>
      </div>
    </>
  );
};

// Define the keyframes for the fade-in effect
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Create a styled component for the h1 element
const FadeInH1 = styled.h1`
  color: #ffffff;
  font-size: 3em;
  font-family: 'Quicksand', 'Helvetica Neue', sans-serif;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 5s ease forwards;
`;
