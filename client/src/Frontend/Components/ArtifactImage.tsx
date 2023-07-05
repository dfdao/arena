import { ArtifactFileColor } from '@darkforest_eth/gamelogic';
import { spriteFromArtifact } from '@darkforest_eth/renderer/dist/TextureManager';
import { Artifact } from '@darkforest_eth/types';
import React from 'react';
import Spritesheet from 'react-responsive-spritesheet';
import styled, { css } from 'styled-components';
import dfstyles from '../Styles/dfstyles';

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
  console.log(`start at: ${index.x1 * 16}, ${index.y1 * 16}, ${startAt}`);
  return (
    <Container width={size} height={size}>
      <Spritesheet
        image={`/sprites/artifactthumbs.png`}
        widthFrame={16}
        heightFrame={16}
        steps={0}
        fps={0}
        direction={'forward'}
        startAt={startAt}
        autoplay={false}
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
