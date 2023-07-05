import React, { Component, RefObject } from 'react';

interface SpriteProps {
  spriteSheetUrl: string;
  spriteWidth: number;
  spriteHeight: number;
  spriteX: number;
  spriteY: number;
  width: number;
  height: number;
}

interface SpriteState {
  width: number;
  height: number;
}

class Sprite extends Component<SpriteProps, SpriteState> {
  containerRef: RefObject<HTMLDivElement>;

  constructor(props: SpriteProps) {
    super(props);

    this.containerRef = React.createRef();
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    const container = this.containerRef.current;
    if (container) {
      this.setState({
        width: container.offsetWidth,
        height: container.offsetHeight,
      });
    }
  };

  render() {
    const { spriteSheetUrl, spriteWidth, spriteHeight, spriteX, spriteY, width, height } =
      this.props;

    const numSpritesW = width / spriteWidth;
    const numSpritesH = height / spriteHeight;
    const spriteStyle = {
      width: '100%',
      height: '100%',
      backgroundImage: `url(${spriteSheetUrl})`,
      backgroundPosition: `-${spriteX * spriteWidth * numSpritesW}px -${
        spriteY * spriteHeight * numSpritesH
      }px`,
      backgroundSize: `${width * spriteWidth}px ${height * spriteHeight}px`,
      backgroundRepeat: 'no-repeat',
    };

    return <div ref={this.containerRef} style={spriteStyle}></div>;
  }
}

export default Sprite;
