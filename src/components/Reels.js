import React, { Component } from "react";
import { Container, Graphics, Sprite } from "@inlet/react-pixi";
import TWEEN from "@tweenjs/tween.js";
import {
  NUMBER_OF_RENDERED_LINES,
  NUMBER_OF_LINES,
  WIN_HIGHLIGHT_DURATION
} from "../constants";

class Reels extends Component {
  reelsMask = { current: () => null };

  state = {
    winHighlightBase: 0
  };

  componentDidUpdate(prevProps) {
    const winsLength = this.props.wins.length;
    if (winsLength && prevProps.wins.length !== winsLength) {
      this.showWin();
    }
  }

  showWin = () => {
    const tweensDuration = 0.5 * WIN_HIGHLIGHT_DURATION;
    const highlightTween = new TWEEN
      .Tween({ winHighlightBase: 0 })
      .to({ winHighlightBase: 1 }, tweensDuration)
      .easing(TWEEN.Easing.Exponential.Out)
      .onUpdate(({ winHighlightBase }) => {
        this.setState({ winHighlightBase });
      });
    const dimTween = new TWEEN
      .Tween({ winHighlightBase: 1 })
      .to({ winHighlightBase: 0 }, tweensDuration)
      .easing(TWEEN.Easing.Exponential.Out)
      .onUpdate(({ winHighlightBase }) => {
        this.setState({ winHighlightBase });
      });
    highlightTween.chain(dimTween).start();
  };

  render() {
    const {
      cabinetSize,
      reelWidth,
      reelHeight,
      reels,
      wins,
      cheatsOn
    } = this.props;
    const { winHighlightBase } = this.state;
    return (
      <Container y={0.15 * cabinetSize}>
        <Graphics
          draw={g => {
            g.clear();
            g.lineStyle(0.01 * cabinetSize, cheatsOn ? 0xff0f0f : 0x0f0f0f, 1, 0);
            g.moveTo(0, 1);
            g.lineTo(cabinetSize, 1);
            g.moveTo(0, reelHeight + 0.01 * cabinetSize);
            g.lineTo(cabinetSize, reelHeight + 0.01 * cabinetSize);
          }}
        />
        <Container y={0.01 * cabinetSize} mask={this.reelsMask.current}>
          <Graphics
            ref={this.reelsMask}
            draw={g => {
              g.clear();
              g.drawRect(0, 0, cabinetSize, reelHeight);
            }}
          />
          <Graphics
            draw={g => {
              g.clear();
              g.beginFill(0xe0e0e0);
              g.drawRect(0, 0, cabinetSize, reelHeight);
              g.endFill();
            }}
          />
          {reels.map(({ symbols, blur }, i) => {
            return (
              <Container key={`reel_${i}`} filters={[blur]}>
                {symbols.map(({ image, y }, j) => {
                  if (j >= NUMBER_OF_RENDERED_LINES) return null;
                  let offsetX = (i + 0.5) * reelWidth;
                  let offsetY = y * reelWidth;
                  let w = reelWidth,
                    h = reelWidth;
                  let alpha = 1 - 0.9 * winHighlightBase;
                  if (
                    wins[0] &&
                    i < wins[0].length &&
                    j === NUMBER_OF_LINES - 1 - wins[0].line[i] &&
                    winHighlightBase
                  ) {
                    w = h = (1 + 0.2 * winHighlightBase) * reelWidth;
                    alpha = 1;
                  }
                  return (
                    <Sprite
                      key={`symbol_${i}_${j}`}
                      x={offsetX}
                      y={offsetY}
                      width={w}
                      height={h}
                      alpha={alpha}
                      anchor={[0.5, 0.5]}
                      image={image}
                    />
                  );
                })}
              </Container>
            );
          })}
        </Container>
      </Container>
    );
  }
}

export default Reels;
