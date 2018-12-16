import React from "react";
import { Graphics, Text } from "@inlet/react-pixi";

const BetButtons = ({ cabinetSize, betOne, betMax, bet }) => (
  <Graphics
    x={0.05 * cabinetSize}
    y={0.84 * cabinetSize}
    draw={g => {
      g.clear();
      g.lineStyle(0.005 * cabinetSize, 0x0f0f0f, 0.5, 1);
      g.beginFill(0xd0d0d0);
      g.drawRoundedRect(0, 0, 0.3 * cabinetSize, 0.1 * cabinetSize, 0.03 * cabinetSize);
      g.endFill();
    }}
  >
    {/* BET ONE */}
    <Graphics
      interactive={true}
      draw={g => {
        g.clear();
        g.lineStyle(0.005 * cabinetSize, 0x0f0f0f, 0.5, 1);
        g.beginFill(0xf0f0f0);
        g.drawRoundedRect(0, 0, 0.1 * cabinetSize, 0.1 * cabinetSize, 0.03 * cabinetSize );
        g.endFill();
      }}
      pointertap={betOne}
      cursor="pointer"
    >
      <Text
        text="BET"
        anchor={[0.5, 1]}
        x={0.05 * cabinetSize}
        y={0.05 * cabinetSize}
        style={{ fontSize: 0.03 * cabinetSize }}
      />
      <Text
        text="ONE"
        anchor={[0.5, 0]}
        x={0.05 * cabinetSize}
        y={0.05 * cabinetSize}
        style={{ fontSize: 0.03 * cabinetSize }}
      />
    </Graphics>
    {/* CURRENT AMOUNT */}
    <Text
      text={bet}
      anchor={[0.5, 0.5]}
      x={0.15 * cabinetSize}
      y={0.05 * cabinetSize}
      style={{ fontSize: 0.05 * cabinetSize }}
    />
    {/* BET MAX */}
    <Graphics
      x={0.2 * cabinetSize}
      interactive={true}
      draw={g => {
        g.clear();
        g.lineStyle(0.005 * cabinetSize, 0x0f0f0f, 0.5, 1);
        g.beginFill(0xf0f0f0);
        g.drawRoundedRect(0, 0, 0.1 * cabinetSize, 0.1 * cabinetSize, 0.03 * cabinetSize);
        g.endFill();
      }}
      pointertap={betMax}
      cursor="pointer"
    >
      <Text
        text="BET"
        anchor={[0.5, 1]}
        x={0.05 * cabinetSize}
        y={0.05 * cabinetSize}
        style={{ fontSize: 0.03 * cabinetSize }}
      />
      <Text
        text="MAX"
        anchor={[0.5, 0]}
        x={0.05 * cabinetSize}
        y={0.05 * cabinetSize}
        style={{ fontSize: 0.03 * cabinetSize }}
      />
    </Graphics>
  </Graphics>
);

export default BetButtons;
