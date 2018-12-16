import React from "react";
import { Container, Graphics, Sprite, Text } from "@inlet/react-pixi";
import { WinCondition } from "./";
import { WIN_CONDITIONS } from "../constants";
import { SYMBOLS } from "../constants";

const Cabinet = ({ cabinetSize, bet, hideHelp }) => (
  <Graphics
    interactive={true}
    draw={g => {
      g.clear();
      g.beginFill(0x000000, 0.5);
      g.drawRoundedRect(0, 0, cabinetSize, cabinetSize, 0.05 * cabinetSize);
      g.endFill();
    }}
  >
    <Graphics
      x={0.1 * cabinetSize}
      y={0.1 * cabinetSize}
      draw={g => {
        g.clear();
        g.beginFill(0xffffff);
        g.lineStyle(0.005 * cabinetSize, 0x0f0f0f, 1, 0);
        g.drawRoundedRect(0, 0, 0.8 * cabinetSize, 0.8 * cabinetSize, 0.05 * cabinetSize);
        g.endFill();
      }}
    >
      {/* CLOSE HELP */}
      <Graphics
        interactive={true}
        x={0.69 * cabinetSize}
        y={0.04 * cabinetSize}
        draw={g => {
          g.clear();
          g.lineStyle(0.005 * cabinetSize, 0x0f0f0f, 0.5, 1);
          g.beginFill(0xf0f0f0);
          g.drawRoundedRect(0, 0, 0.07 * cabinetSize, 0.07 * cabinetSize, 0.02 * cabinetSize);
          g.endFill();
        }}
        pointertap={hideHelp}
        cursor="pointer"
      >
        <Text
          text="X"
          anchor={[0.5, 0.5]}
          x={0.035 * cabinetSize}
          y={0.035 * cabinetSize}
          style={{ fontSize: 0.03 * cabinetSize }}
        />
      </Graphics>
      {/* FRUITS */}
      <Graphics
        x={0.07 * cabinetSize}
        y={0.13 * cabinetSize}
        draw={g => {
          g.clear();
          g.beginFill(0xf0f0f0);
          g.drawRoundedRect(0, 0, 0.1 * cabinetSize, 0.15 * cabinetSize, 0.02 * cabinetSize);
          g.endFill();
        }}
      >
        {SYMBOLS.map(({ image }, i) => {
          if (i > 5) return null;
          return (
            <Sprite
              key={`symbol_${i}`}
              x={(i % 2) * 0.05 * cabinetSize}
              y={Math.floor(i / 2) * 0.05 * cabinetSize}
              width={0.05 * cabinetSize}
              height={0.05 * cabinetSize}
              image={image}
            />
          );
        })}
        <Text
          text="5"
          x={0.125 * cabinetSize}
          y={0.025 * cabinetSize}
          anchor={[0.5, 0.5]}
          style={{ fontSize: 0.025 * cabinetSize }}
        />
        <Text
          text={SYMBOLS[0][5] * bet}
          x={0.15 * cabinetSize}
          y={0.025 * cabinetSize}
          anchor={[0, 0.5]}
          style={{
            fontSize: 0.035 * cabinetSize,
            fill: 0x000000,
            fontStyle: "bold"
          }}
        />
        <Text
          text="4"
          x={0.125 * cabinetSize}
          y={0.075 * cabinetSize}
          anchor={[0.5, 0.5]}
          style={{ fontSize: 0.025 * cabinetSize }}
        />
        <Text
          text={SYMBOLS[0][4] * bet}
          x={0.15 * cabinetSize}
          y={0.075 * cabinetSize}
          anchor={[0, 0.5]}
          style={{
            fontSize: 0.035 * cabinetSize,
            fill: 0x000000,
            fontStyle: "bold"
          }}
        />
        <Text
          text="3"
          x={0.125 * cabinetSize}
          y={0.125 * cabinetSize}
          anchor={[0.5, 0.5]}
          style={{ fontSize: 0.025 * cabinetSize }}
        />
        <Text
          text={SYMBOLS[0][3] * bet}
          x={0.15 * cabinetSize}
          y={0.125 * cabinetSize}
          anchor={[0, 0.5]}
          style={{
            fontSize: 0.035 * cabinetSize,
            fill: 0x000000,
            fontStyle: "bold"
          }}
        />
      </Graphics>
      {/* GEMS */}
      <Graphics
        x={0.325 * cabinetSize}
        y={0.13 * cabinetSize}
        draw={g => {
          g.clear();
          g.beginFill(0xf0f0f0);
          g.drawRoundedRect(0, 0, 0.05 * cabinetSize, 0.15 * cabinetSize, 0.02 * cabinetSize);
          g.endFill();
        }}
      >
        {SYMBOLS.map(({ image }, i) => {
          if (i < 6 || i > 8) return null;
          return (
            <Sprite
              key={`symbol_${i}`}
              y={(i - 6) * 0.05 * cabinetSize}
              width={0.05 * cabinetSize}
              height={0.05 * cabinetSize}
              image={image}
            />
          );
        })}
        <Text
          text="5"
          x={0.075 * cabinetSize}
          y={0.025 * cabinetSize}
          anchor={[0.5, 0.5]}
          style={{ fontSize: 0.025 * cabinetSize }}
        />
        <Text
          text={SYMBOLS[6][5] * bet}
          x={0.1 * cabinetSize}
          y={0.025 * cabinetSize}
          anchor={[0, 0.5]}
          style={{
            fontSize: 0.035 * cabinetSize,
            fill: 0x000000,
            fontStyle: "bold"
          }}
        />
        <Text
          text="4"
          x={0.075 * cabinetSize}
          y={0.075 * cabinetSize}
          anchor={[0.5, 0.5]}
          style={{ fontSize: 0.025 * cabinetSize }}
        />
        <Text
          text={SYMBOLS[6][4] * bet}
          x={0.1 * cabinetSize}
          y={0.075 * cabinetSize}
          anchor={[0, 0.5]}
          style={{
            fontSize: 0.035 * cabinetSize,
            fill: 0x000000,
            fontStyle: "bold"
          }}
        />
        <Text
          text="3"
          x={0.075 * cabinetSize}
          y={0.125 * cabinetSize}
          anchor={[0.5, 0.5]}
          style={{ fontSize: 0.025 * cabinetSize }}
        />
        <Text
          text={SYMBOLS[6][3] * bet}
          x={0.1 * cabinetSize}
          y={0.125 * cabinetSize}
          anchor={[0, 0.5]}
          style={{
            fontSize: 0.035 * cabinetSize,
            fill: 0x000000,
            fontStyle: "bold"
          }}
        />
      </Graphics>
      {/* BARS AND CROWN */}
      <Graphics
        x={0.525 * cabinetSize}
        y={0.13 * cabinetSize}
        draw={g => {
          g.clear();
          g.beginFill(0xf0f0f0);
          g.drawRoundedRect(0, 0, 0.05 * cabinetSize, 0.15 * cabinetSize, 0.02 * cabinetSize);
          g.endFill();
        }}
      >
        {SYMBOLS.map(({ image }, i) => {
          if (i < 9) return null;
          return (
            <Sprite
              key={`symbol_${i}`}
              y={(i - 9) * 0.05 * cabinetSize}
              width={0.05 * cabinetSize}
              height={0.05 * cabinetSize}
              image={image}
            />
          );
        })}
        <Text
          text="5"
          x={0.075 * cabinetSize}
          y={0.025 * cabinetSize}
          anchor={[0.5, 0.5]}
          style={{ fontSize: 0.025 * cabinetSize }}
        />
        <Text
          text={SYMBOLS[9][5] * bet}
          x={0.1 * cabinetSize}
          y={0.025 * cabinetSize}
          anchor={[0, 0.5]}
          style={{
            fontSize: 0.035 * cabinetSize,
            fill: 0x000000,
            fontStyle: "bold"
          }}
        />
        <Text
          text="4"
          x={0.075 * cabinetSize}
          y={0.075 * cabinetSize}
          anchor={[0.5, 0.5]}
          style={{ fontSize: 0.025 * cabinetSize }}
        />
        <Text
          text={SYMBOLS[9][4] * bet}
          x={0.1 * cabinetSize}
          y={0.075 * cabinetSize}
          anchor={[0, 0.5]}
          style={{
            fontSize: 0.035 * cabinetSize,
            fill: 0x000000,
            fontStyle: "bold"
          }}
        />
        <Text
          text="3"
          x={0.075 * cabinetSize}
          y={0.125 * cabinetSize}
          anchor={[0.5, 0.5]}
          style={{ fontSize: 0.025 * cabinetSize }}
        />
        <Text
          text={SYMBOLS[9][3] * bet}
          x={0.1 * cabinetSize}
          y={0.125 * cabinetSize}
          anchor={[0, 0.5]}
          style={{
            fontSize: 0.035 * cabinetSize,
            fill: 0x000000,
            fontStyle: "bold"
          }}
        />
      </Graphics>
      {/* DESCRIPTION */}
      <Container x={0.4 * cabinetSize} y={0.34 * cabinetSize}>
        <Text
          text="Roll at least 3 same symbols connected left"
          anchor={[0.5, 1]}
          style={{ fontSize: 0.03 * cabinetSize }}
        />
        <Text
          text="to right in one of the following lines:"
          anchor={[0.5, 0]}
          style={{ fontSize: 0.03 * cabinetSize }}
        />
      </Container>
      {/* LANE 1 */}
      <Container  y={0.4 * cabinetSize}>
        <Container>
          <WinCondition
            x={0.24 * cabinetSize}
            cabinetSize={cabinetSize}
            winCondition={WIN_CONDITIONS[0]}
          />
          <WinCondition
            x={0.41 * cabinetSize}
            cabinetSize={cabinetSize}
            winCondition={WIN_CONDITIONS[1]}
          />
        </Container>
        {/* LANE 2 */}
        <Container y={0.11 * cabinetSize}>
          <WinCondition
            x={0.155 * cabinetSize}
            cabinetSize={cabinetSize}
            winCondition={WIN_CONDITIONS[2]}
          />
          <WinCondition
            x={0.325 * cabinetSize}
            cabinetSize={cabinetSize}
            winCondition={WIN_CONDITIONS[3]}
          />
          <WinCondition
            x={0.495 * cabinetSize}
            cabinetSize={cabinetSize}
            winCondition={WIN_CONDITIONS[4]}
          />
        </Container>
        {/* LANE 3 */}
        <Container y={0.22 * cabinetSize}>
          <WinCondition
            x={0.24 * cabinetSize}
            cabinetSize={cabinetSize}
            winCondition={WIN_CONDITIONS[5]}
          />
          <WinCondition
            x={0.41 * cabinetSize}
            cabinetSize={cabinetSize}
            winCondition={WIN_CONDITIONS[6]}
          />
        </Container>
      </Container>
      <Container x={0.4 * cabinetSize} y={0.74 * cabinetSize}>
        <Text
          anchor={[0.5, 0]}
          text="Only the highest win per line is paid"
          style={{ fontSize: 0.025 * cabinetSize }}
        />
      </Container>
    </Graphics>
  </Graphics>
);

export default Cabinet;
