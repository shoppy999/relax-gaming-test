import React, { Component } from "react";
import { Stage } from "@inlet/react-pixi";
import * as PIXI from "pixi.js";
import TWEEN from "@tweenjs/tween.js";
import {
  Cabinet,
  Credit,
  HelpButton,
  Reels,
  BetButtons,
  SpinButton,
  Help
} from "./components";
import "./App.css";
import {
  NUMBER_OF_REELS,
  NUMBER_OF_RENDERED_LINES,
  SYMBOLS,
  BET_STEPS,
  WIN_CONDITIONS,
  NUMBER_OF_LINES,
  WIN_HIGHLIGHT_DURATION,
  SOUNDS
} from "./constants";
import { getDimensions } from "./helpers";


class App extends Component {
  spinning = false;
  reelsMask = { current: () => null };

  constructor(props) {
    super(props);

    let reels = [];
    for (let i = 0; i < NUMBER_OF_REELS; i++) {
      let reel = {
        symbols: [],
        position: 0,
        previousPosition: 0,
        blur: new PIXI.filters.BlurFilter()
      };
      reel.blur.blurX = 0;
      reel.blur.blurY = 0;
      let availableSymbols = [...SYMBOLS];
      for (let j = 0, l = SYMBOLS.length; j < l; j++) {
        let randomSymbol = availableSymbols.splice(Math.floor(Math.random() * availableSymbols.length), 1)[0];
        reel.symbols.push({ ...randomSymbol, y: NUMBER_OF_RENDERED_LINES - j - 1.5 });
      }
      reels.push(reel);
    }

    this.state = {
      dimensions: getDimensions(),
      reels,
      credit: 1000,
      bet: BET_STEPS[0],
      wins: [],
      showHelp: false,
      cheatsOn: false,
    };
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
    window.addEventListener("keypress", ({ code }) => {
      switch(code) {
        case 'Space':
          this.spin();
          break;
        case 'Enter':
          this.toggleHacks()
          break;
        default:
      }
    });
    this.loop();
  }

  updateDimensions = () => {
    this.setState({ dimensions: getDimensions() });
  };

  loop = () => {
    requestAnimationFrame(this.loop);
    TWEEN.update();
  };

  showHelp = () => {
    this.setState({ showHelp: true });
  };

  hideHelp = () => {
    this.setState({ showHelp: false });
  };
  
  toggleHacks = () => {
    if (this.spinning) {
      let buttonSound = new Audio(SOUNDS.disabled);
      buttonSound.volume = 0.2;
      buttonSound.play();
      return;
    };
    new Audio(SOUNDS.button).play();
    this.setState({ cheatsOn: !this.state.cheatsOn });
  }

  betOne = () => {
    if (this.spinning) {
      let buttonSound = new Audio(SOUNDS.disabled);
      buttonSound.volume = 0.2;
      buttonSound.play();
      return;
    }
  new Audio(SOUNDS.button).play();
    const { bet, credit } = this.state;
    let nextBet = BET_STEPS.find(b => b > bet && b < credit);
    if (!nextBet) {
      if (bet === credit) {
        nextBet = BET_STEPS[0];
      } else {
        nextBet = credit > BET_STEPS[BET_STEPS.length - 1] ? BET_STEPS[0] : credit;
      }
    }
    this.setState({ bet: nextBet });
  };

  betMax = () => {
    if (this.spinning) {
      let buttonSound = new Audio(SOUNDS.disabled);
      buttonSound.volume = 0.2;
      buttonSound.play();
      return;
    }
  new Audio(SOUNDS.button).play();
    const { credit } = this.state;
    this.setState({ bet: Math.min(credit, BET_STEPS[BET_STEPS.length - 1]) });
  };

  spin = () => {
    const {
      credit,
      bet,
      reels,
      dimensions: { reelWidth },
      cheatsOn,
    } = this.state;

    if (this.spinning || credit < bet) {
      let buttonSound = new Audio(SOUNDS.disabled);
      buttonSound.volume = 0.2;
      buttonSound.play();
      return;
    }

    this.spinning = true;
    new Audio(SOUNDS.spin).play();
    this.setState({ credit: credit - bet });

    const newReels = [];
    const hackSymbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    const hackLine =  WIN_CONDITIONS[Math.floor(Math.random() * WIN_CONDITIONS.length)];
    for (let i = 0, l = reels.length; i < l; i++) {
      const { position } = reels[i];
      let extraRotations = Math.floor(Math.random() * SYMBOLS.length);
      if (cheatsOn) {
        extraRotations = reels[i].symbols.findIndex(s => s.type === hackSymbol.type) - 2 + hackLine[i];
      }
      const rotationsTotal = (1 + i) * SYMBOLS.length + extraRotations;
      let rotationsCurrent = 0;
      const newReel = newReels[i] || { ...reels[i] };
      let previousPosition = position;
      new TWEEN
        .Tween({ position })
        .to({ position: position + rotationsTotal }, 1200 + i * 500)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(update => {
          const positionDelta = update.position - position;
          const rotations = Math.floor(positionDelta);
          if (rotations > rotationsCurrent) {
            while (rotationsCurrent < rotations) {
              const tickAudio = new Audio(SOUNDS.reelTick);
              tickAudio.volume = 0.04;
              tickAudio.play();
              newReel.symbols.push(newReel.symbols.shift());
              rotationsCurrent++;
            }
          }
          newReel.blur.blurY = 0.1 * (update.position - previousPosition) * reelWidth;
          newReel.symbols = newReel.symbols.map((s, j) => ({ ...s, y: NUMBER_OF_RENDERED_LINES - j - 1.5 + (positionDelta % 1) }));
          newReels[i] = newReel;
          if (i === l - 1) {
            this.setState({ reels: newReels });
          }
          previousPosition = update.position;
        })
        .onComplete(() => {
          newReel.position = 0;
          newReel.blur.blurY = 0;
          while (rotationsCurrent < rotationsTotal) {
            newReel.symbols.push(newReel.symbols.shift());
            rotationsCurrent++;
          }
          newReel.symbols = newReel.symbols.map((s, j) => ({ ...s, y: NUMBER_OF_RENDERED_LINES - j - 1.5 }));
          new Audio(SOUNDS.reelTick).play();
          if (i === l - 1) {
            this.setState({ reels: newReels }, this.checkResults);
          }
        })
        .start();
    }
  };

  checkResults = () => {
    const { reels, bet } = this.state;
    let wins = [];
    for (let winCondition of WIN_CONDITIONS) {
      let chainLength = 1;
      let symbol = reels[0].symbols[NUMBER_OF_LINES - 1 - winCondition[0]];
      for (let i = 1, l = winCondition.length; i < l; i++) {
        const previousSymbol = reels[i - 1].symbols[NUMBER_OF_LINES - 1 - winCondition[i - 1]];
        const currentSymbol = reels[i].symbols[NUMBER_OF_LINES - 1 - winCondition[i]];
        if (previousSymbol.type === currentSymbol.type) {
          chainLength++;
        } else {
          break;
        }
      }
      if (chainLength > 2) {
        const line = winCondition;
        const amount = bet * symbol[chainLength];
        wins.push({ length: chainLength, amount, line });
      }
    }
    this.setState({ wins }, this.highlightWins);
  };

  highlightWins = () => {
    const { credit, wins } = this.state;
    if (this.state.wins[0]) {
      new Audio(SOUNDS.win).play();
      this.setState({ credit: credit + wins[0].amount });
      setTimeout(() => {
        const { wins } = this.state;
        this.setState({ wins: wins.slice(1) }, this.highlightWins);
      }, WIN_HIGHLIGHT_DURATION);
    } else {
      this.spinning = false;
    }
  };

  render() {
    const { dimensions, credit, bet, reels, wins, showHelp, cheatsOn } = this.state;
    const {
      windowWidth,
      windowHeight,
      cabinetSize,
      cabinetX,
      cabinetY,
      reelWidth,
      reelHeight
    } = dimensions;
    return (
      <Stage
        width={windowWidth}
        height={windowHeight}
        options={{
          backgroundColor: 0x012b30
        }}
      >
        <Cabinet
          cabinetSize={cabinetSize}
          cabinetX={cabinetX}
          cabinetY={cabinetY}
          cheatsOn={cheatsOn}
        >
          <Credit
            cabinetSize={cabinetSize}
            credit={credit}
            wins={wins}
          />
          <HelpButton
            cabinetSize={cabinetSize}
            showHelp={this.showHelp}
          />
          <Reels
            cabinetSize={cabinetSize}
            reelWidth={reelWidth}
            reelHeight={reelHeight}
            reels={reels}
            wins={wins}
            cheatsOn={cheatsOn}
            />
          <BetButtons
            cabinetSize={cabinetSize}
            betOne={this.betOne}
            betMax={this.betMax}
            bet={bet}
          />
          <SpinButton
            cabinetSize={cabinetSize}
            spin={this.spin}
          />
          {showHelp && (
            <Help
              cabinetSize={cabinetSize}
              hideHelp={this.hideHelp}
              bet={bet}
            />
          )}
        </Cabinet>
      </Stage>
    );
  }
}

export default App;
