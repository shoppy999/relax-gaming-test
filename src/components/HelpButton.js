import React from "react";
import { Graphics, Text } from "@inlet/react-pixi";

const HelpButton = ({ cabinetSize, showHelp }) => (
  <Graphics
    interactive={true}
    x={0.89 * cabinetSize}
    y={0.04 * cabinetSize}
    draw={g => {
      g.clear();
      g.lineStyle(0.005 * cabinetSize, 0x0f0f0f, 0.5, 1);
      g.beginFill(0xf0f0f0);
      g.drawRoundedRect(0, 0, 0.07 * cabinetSize, 0.07 * cabinetSize, 0.02 * cabinetSize);
      g.endFill();
    }}
    pointertap={showHelp}
    cursor="pointer"
  >
    <Text
      text="?"
      anchor={[0.5, 0.5]}
      x={0.035 * cabinetSize}
      y={0.035 * cabinetSize}
      style={{ fontSize: 0.04 * cabinetSize }}
    />
  </Graphics>
);

export default HelpButton;
