import { IconType } from '@darkforest_eth/ui';
import React, { CSSProperties, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Link, Spacer } from '../Components/CoreUI';
import { Discord, Icon } from '../Components/Icons';
import { HideSmall } from '../Components/Text';
import dfstyles from '../Styles/dfstyles';
import { LobbyButton } from './Lobby/LobbyMapEditor';
// @ts-expect-error types
import StarfieldAnimation from 'react-starfield-animation';
import { Countdown } from '../Views/Countdown';
import { Stars } from '../Views/Portal/Stars';

export const enum LandingPageZIndex {
  Background = 0,
  Canvas = 1,
  BasePage = 2,
}

const links = {
  twitter: 'http://twitter.com/d_fdao',
  email: 'mailto:zeroxhank@gmail.com',
  blog: 'https://medium.com/dfdao/latest',
  discord: 'https://discord.gg/7DMzRb9a3K',
  github: 'https://github.com/dfdao/arena',
  wiki: 'https://dfwiki.net/wiki/Main_Page',
  plugins: 'https://plugins.zkga.me/',
};

export default function LandingPage() {
  const history = useHistory();
  const [showWallbreakers, setShowWallbreakers] = useState<boolean>(false);

  const showStars = true;

  return showStars ? (
    <Stars />
  ) : (
    <>
      <Container>
        <BackgroundImage />
        <Nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Icon
              style={{ width: '80px', height: '80px' } as CSSStyleDeclaration & CSSProperties}
              type={IconType.Dfdao}
            />
          </div>
          <LinksContainer>
            {Object.entries(links).map(([link, href], key) => (
              <React.Fragment key={key}>
                <NavLink key={key} to={href}>
                  {link}
                </NavLink>
                {key !== Object.entries(links).length - 1 && <p>{` | `}</p>}
              </React.Fragment>
            ))}
          </LinksContainer>
        </Nav>
        <Content>
          <TextContainer>
            <Badge>
              <HideSmall>Dark Forest Arena</HideSmall> 🏟️
            </Badge>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <LobbyButton primary style={{ flex: '2' }} onClick={() => history.push('/portal')}>
                Enter
              </LobbyButton>
              <LobbyButton
                style={{ flex: '1' }}
                onClick={() =>
                  window.open(
                    'https://medium.com/dfdao/dark-forest-grand-prix-season-1-3cfc48a7f9a2',
                    'blank'
                  )
                }
              >
                Learn More
              </LobbyButton>
            </div>
          </TextContainer>
        </Content>
      </Container>
    </>
  );
}

const NavLink = styled(Link)`
  color: #fff;
  font-family: 'Karla', sans-serif;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: 500;
  letter-spacing: 0.06em;
  transition: color 0.2s ease;
  &:hover {
    color: ${dfstyles.colors.dfblue};
  }
`;

const Badge = styled.div`
  font-size: 3rem;
  // border-radius: 3rem;
  // background-color: ${dfstyles.colors.backgroundlighter};
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.5rem 1rem;
  align-self: flex-start;
  @media (max-width: 768px) {
    align-self: center;
  }
`;

const Container = styled.div`
  justify-content: center;
  background: #111;
  color: #fff;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  align-items: center;
  position: relative;
  @media (max-width: 768px) {
    overflow-y: auto;
    margin-bottom: 3rem;
  }
`;

const Content = styled.div`
  box-shadow: 0px 0px 15px gray;
  justify-content: center;
  backdrop-filter: brightness(0.1) blur(5px);
  align-items: center;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
  z-index: 2;
  border-radius: 20px;
`;

const Nav = styled.div`
  position: fixed;
  top: 0;
  backdrop-filter: brightness(0.2) blur(5px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 3rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const TextContainer = styled.div`
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  padding: 3rem;
  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

export const BackgroundImage = styled.img`
  width: 100vw;
  height: 100vh;
  display: fixed;
  background-image: url(/public/img/screenshots/deathstar.png);
  background-size: cover;
  filter: blur(5px) brightness(0.9);
  background-position: 50%, 50%;
  // display: inline-block;
  position: fixed;
  top: 0;
  left: 0;
  // z-index: -1;
`;

const TRow = styled.tr`
  & td:first-child {
    color: ${dfstyles.colors.subtext};
  }
  & td:nth-child(2) {
    padding-left: 12pt;
  }
  & td:nth-child(3) {
    text-align: right;
    padding-left: 16pt;
  }
`;

export const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    margin: 0 6pt;
    transition: color 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      cursor: pointer;
      &.link-twitter {
        color: ${dfstyles.colors.icons.twitter};
      }
      &.link-github {
        color: ${dfstyles.colors.icons.github};
      }
      &.link-discord {
        color: ${dfstyles.colors.icons.discord};
      }
      &.link-blog {
        color: ${dfstyles.colors.icons.blog};
      }
      &.link-email {
        color: ${dfstyles.colors.icons.email};
      }
    }
  }
`;
