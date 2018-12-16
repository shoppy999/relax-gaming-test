export const NUMBER_OF_REELS = 5;
export const NUMBER_OF_LINES = 3;
export const NUMBER_OF_RENDERED_LINES = 4;
export const SYMBOLS = [
  { type: 1, image: "img/cherry.png", 3: 5, 4: 15, 5: 40 },
  { type: 2, image: "img/grapes.png", 3: 5, 4: 15, 5: 40 },
  { type: 3, image: "img/bananas.png", 3: 5, 4: 15, 5: 40 },
  { type: 4, image: "img/lemon.png", 3: 5, 4: 15, 5: 40 },
  { type: 5, image: "img/strawberry.png", 3: 5, 4: 15, 5: 40 },
  { type: 6, image: "img/orange.png", 3: 5, 4: 15, 5: 40 },
  { type: 7, image: "img/emerald.png", 3: 10, 4: 30, 5: 80 },
  { type: 8, image: "img/ruby.png", 3: 10, 4: 30, 5: 80 },
  { type: 9, image: "img/diamond.png", 3: 10, 4: 30, 5: 80 },
  { type: 10, image: "img/bar.png", 3: 15, 4: 50, 5: 150 },
  { type: 11, image: "img/barbarbar.png", 3: 15, 4: 50, 5: 150 },
  { type: 12, image: "img/crown.png", 3: 15, 4: 50, 5: 150 },
];
export const BET_STEPS = [1, 2, 3, 4, 5, 10, 15, 25, 50];
export const WIN_CONDITIONS = [
  [0, 0, 0, 0, 0],
  [0, 1, 2, 1, 0],
  [1, 1, 1, 1, 1],
  [1, 0, 1, 2, 1],
  [1, 2, 1, 0, 1],
  [2, 2, 2, 2, 2],
  [2, 1, 0, 1, 2]
];
export const WIN_HIGHLIGHT_DURATION = 2000;
export const SOUNDS = {
  reelTick: "sound/reel_tick.wav",
  spin: "sound/spin.ogg",
  win: "sound/win.wav",
  button: "sound/button.wav",
  disabled: "sound/disabled.wav"
};
