import React, { Component } from "react";
import { Container, Graphics, Text } from "@inlet/react-pixi";
import TWEEN from "@tweenjs/tween.js";
import { WIN_HIGHLIGHT_DURATION } from "../constants";

class Credit extends Component {
  state = {
    winAmountOpacity: 0,
    winAmountPosition: -1
  };

  componentDidUpdate(prevProps) {
    const winsLength = this.props.wins.length;
    if (winsLength && prevProps.wins.length !== winsLength) {
      this.showWin();
    }
  }

  showWin = () => {
    const tweensDuration = 0.5 * WIN_HIGHLIGHT_DURATION;
    const showWonAmountTween = new TWEEN
      .Tween({ winAmountOpacity: 0 })
      .to({ winAmountOpacity: 1 }, tweensDuration)
      .easing(TWEEN.Easing.Exponential.Out)
      .onUpdate(({ winAmountOpacity }) => {
        this.setState({ winAmountOpacity });
      });
    const hideWonAmountTween = new TWEEN
      .Tween({ winAmountOpacity: 1 })
      .to({ winAmountOpacity: 0 }, tweensDuration)
      .easing(TWEEN.Easing.Exponential.Out)
      .onUpdate(({ winAmountOpacity }) => {
        this.setState({ winAmountOpacity });
      });
    const moveWonAmountTween = new TWEEN
      .Tween({ winAmountPosition: -1 })
      .to({ winAmountPosition: 1 }, WIN_HIGHLIGHT_DURATION)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(({ winAmountPosition }) => {
        this.setState({ winAmountPosition });
      });
    showWonAmountTween.chain(hideWonAmountTween).start();
    moveWonAmountTween.start();
  };

  render() {
    const { cabinetSize, credit, wins } = this.props;
    const { winAmountOpacity, winAmountPosition } = this.state;
    return (
      <Container>
        {wins[0] && winAmountOpacity > 0 && (
          <Text
            text={`+${wins[0].amount}`}
            alpha={winAmountOpacity}
            anchor={[0.5, 0.5]}
            x={0.5 * cabinetSize}
            y={(0.0125 * -winAmountPosition + 0.075) * cabinetSize}
            style={{ fontSize: 0.08 * cabinetSize, fontWeight: "bold" }}
          />
        )}
        <Graphics
          x={0.05 * cabinetSize}
          y={0.05 * cabinetSize}
          draw={g => {
            g.clear();
            g.lineStyle(0.005 * cabinetSize, 0x0f0f0f, 0.5, 1);
            g.beginFill(0xf0f0f0);
            g.drawRoundedRect(0, 0, 0.3 * cabinetSize, 0.05 * cabinetSize, 0.02 * cabinetSize);
            g.endFill();
          }}
        >
          <Text
            text="CREDITS:"
            anchor={[1, 0.5]}
            x={0.125 * cabinetSize}
            y={0.025 * cabinetSize}
            style={{ fontSize: 0.02 * cabinetSize }}
          />
        </Graphics>
        <Graphics
          x={0.2 * cabinetSize}
          y={0.05 * cabinetSize}
          draw={g => {
            g.clear();
            g.lineStyle(0.005 * cabinetSize, 0x0f0f0f, 0.5, 1);
            g.beginFill(0xd0d0d0);
            g.drawRoundedRect(0, 0, 0.15 * cabinetSize, 0.05 * cabinetSize, 0.02 * cabinetSize);
            g.endFill();
          }}
        >
          <Text
            text={credit}
            anchor={[0.5, 0.5]}
            x={0.075 * cabinetSize}
            y={0.025 * cabinetSize}
            style={{ fontSize: 0.03 * cabinetSize }}
          />
        </Graphics>
        <Graphics />
      </Container>
    );
  }
}

export default Credit;
