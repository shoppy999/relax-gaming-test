import { NUMBER_OF_REELS } from "./constants";

export const getDimensions = () => {
  const { innerWidth, innerHeight } = window;
  const cabinetSize = 0.8 * Math.min(innerWidth, innerHeight);
  const cabinetX = (innerWidth - cabinetSize) / 2;
  const cabinetY = (innerHeight - cabinetSize) / 2;
  const reelWidth = cabinetSize / NUMBER_OF_REELS;
  const reelHeight = reelWidth * 3;
  return {
    windowWidth: innerWidth,
    windowHeight: innerHeight,
    cabinetSize,
    cabinetX,
    cabinetY,
    reelWidth,
    reelHeight
  };
};
