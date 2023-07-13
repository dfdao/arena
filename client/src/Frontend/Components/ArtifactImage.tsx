import { ArtifactFileColor } from '@darkforest_eth/gamelogic';
import { spriteFromArtifact } from '@darkforest_eth/renderer/dist/TextureManager';
import { Artifact } from '@darkforest_eth/types';
import React from 'react';
import styled, { css } from 'styled-components';
import dfstyles from '../Styles/dfstyles';
import Sprite from './Sprite';

export function ArtifactImage({
  artifact,
  size,
  thumb,
  bgColor,
}: {
  artifact: Artifact;
  size: number;
  thumb?: boolean;
  bgColor?: ArtifactFileColor;
}) {
  const index = spriteFromArtifact(artifact);
  const startAt = Math.round(index.x1 * 16) + Math.round(index.y1 * 16 * 16);
  return (
    <Container width={size} height={size}>
      <Sprite
        spriteSheetUrl={`/public/sprites/artifactthumbs.png`}
        spriteWidth={16}
        spriteHeight={16}
        spriteX={index.x1 * 16}
        spriteY={index.y1 * 16}
        width={size}
        height={size}
      />
    </Container>
  );
}

const Container = styled.div`
  image-rendering: crisp-edges;

  ${({ width, height }: { width: number; height: number }) => css`
    width: ${width}px;
    height: ${height}px;
    min-width: ${width}px;
    min-height: ${height}px;
    background-color: ${dfstyles.colors.artifactBackground};
    display: inline-block;
  `}
`;
