import React from "react";
import { Container, Graphics } from "@inlet/react-pixi";

const Cabinet = ({ cabinetX, cabinetY, cabinetSize, children, cheatsOn }) => (
  <Container x={cabinetX} y={cabinetY}>
    <Graphics
      draw={g => {
        g.clear();
        g.lineStyle(0.01 * cabinetSize, cheatsOn ? 0xff0f0f : 0x0f0f0f, 1, 0);
        g.beginFill(0xffffff);
        g.drawRoundedRect(0, 0, cabinetSize, cabinetSize, 0.05 * cabinetSize);
        g.endFill();
      }}
    />
    {children}
  </Container>
);

export default Cabinet;
