import React from "react";
import { Graphics } from "@inlet/react-pixi";

const WinCondition = ({ x, cabinetSize, winCondition }) => {
  return (
    <Graphics
      x={x}
      draw={g => {
        g.clear();
        g.beginFill(0xf0f0f0);
        g.drawRoundedRect(0, 0, 0.15 * cabinetSize, 0.09 * cabinetSize, 0.01 * cabinetSize);
        g.endFill();

        g.lineStyle(0.004 * cabinetSize, 0xffffff, 0.5);

        g.moveTo(0, 0.03 * cabinetSize);
        g.lineTo(0.15 * cabinetSize, 0.03 * cabinetSize);

        g.moveTo(0, 0.06 * cabinetSize);
        g.lineTo(0.15 * cabinetSize, 0.06 * cabinetSize);

        g.moveTo(0.03 * cabinetSize, 0);
        g.lineTo(0.03 * cabinetSize, 0.09 * cabinetSize);

        g.moveTo(0.06 * cabinetSize, 0);
        g.lineTo(0.06 * cabinetSize, 0.09 * cabinetSize);

        g.moveTo(0.09 * cabinetSize, 0);
        g.lineTo(0.09 * cabinetSize, 0.09 * cabinetSize);

        g.moveTo(0.12 * cabinetSize, 0);
        g.lineTo(0.12 * cabinetSize, 0.09 * cabinetSize);

        g.lineStyle(0.004 * cabinetSize, 0x0f0f0f, 0.5);
        g.endFill();

        for (let i = 0, l = winCondition.length; i < l; i++) {
          if (i === 0) {
            g.moveTo((i * 0.03 + 0.015) * cabinetSize, (winCondition[i] * 0.03 + 0.015) * cabinetSize);
          } else {
            g.lineTo((i * 0.03 + 0.015) * cabinetSize, (winCondition[i] * 0.03 + 0.015) * cabinetSize);
          }
        }
        g.beginFill(0xdcdcdc);
        for (let i = 0, l = winCondition.length; i < l; i++) {
          g.drawCircle((i * 0.03 + 0.015) * cabinetSize, (winCondition[i] * 0.03 + 0.015) * cabinetSize, 0.007 * cabinetSize);
        }
      }}
    />
  );
};

export default WinCondition;
