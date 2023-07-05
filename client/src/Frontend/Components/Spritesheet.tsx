import React, { Component } from 'react';

type Props = {
  className?: string;
  style?: object;
  image: string;
  widthFrame: number;
  heightFrame: number;
  startAt: number;
};

class Spritesheet extends Component {
  private id: string;
  private startAt: number;
  public props: Props;

  constructor(props: Props) {
    super(props);
    this.id = `react-responsive-spritesheet--${Math.random() * 8}`;
    this.props = props;
  }

  componentDidMount() {
    this.init();
  }

  renderElements = () => {
    const { image, widthFrame, heightFrame } = this.props;

    let containerStyles = {
      position: 'relative',
      overflow: 'hidden',
      width: `${widthFrame}px`,
      height: `${heightFrame}px`,
      transformOrigin: '0 0',
    };

    let moveStyles = {
      overflow: 'hidden',
      backgroundRepeat: 'no-repeat',
      display: 'table-cell',
      backgroundImage: `url(${image})`,
      width: `${widthFrame}px`,
      height: `${heightFrame}px`,
      transformOrigin: '0 50%',
    };

    let elMove = React.createElement('div', {
      className: 'react-responsive-spritesheet-container__move',
      style: moveStyles,
    });

    let elContainer = React.createElement(
      'div',
      { className: 'react-responsive-spritesheet-container', style: containerStyles },
      elMove
    );

    let elSprite = React.createElement(
      'div',

      elContainer
    );

    return elSprite;
  };

  init = () => {
    const { image, widthFrame, heightFrame, startAt } = this.props;

    let imgLoadSprite = new Image();
    imgLoadSprite.src = image;
    this.startAt = this.setStartAt(startAt);

    imgLoadSprite.onerror = () => {
      throw new Error(`Failed to load image ${imgLoadSprite.src}`);
    };
  };

  setStartAt = (frame: number) => {
    this.startAt = frame ? frame - 1 : 0;
    return this.startAt;
  };

  render() {
    return this.renderElements();
  }
}

export default Spritesheet;
