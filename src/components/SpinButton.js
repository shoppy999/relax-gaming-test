import React from "react";
import { Container, Graphics, Text } from "@inlet/react-pixi";

const SpinButton = ({ cabinetSize, spin }) => (
  <Container x={0.65 * cabinetSize} y={0.84 * cabinetSize}>
    <Graphics
      interactive={true}
      draw={g => {
        g.clear();
        g.lineStyle(0.005 * cabinetSize, 0x0f0f0f, 0.5, 1);
        g.beginFill(0xf0f0f0);
        g.drawRoundedRect(0, 0, 0.3 * cabinetSize, 0.1 * cabinetSize, 0.03 * cabinetSize);
        g.endFill();
      }}
      pointertap={spin}
      cursor="pointer"
    >
      <Text
        text="SPIN"
        anchor={[0.5, 0.5]}
        x={0.15 * cabinetSize}
        y={0.05 * cabinetSize}
        style={{ fontSize: 0.05 * cabinetSize }}
      />
    </Graphics>
  </Container>
);

export default SpinButton;
