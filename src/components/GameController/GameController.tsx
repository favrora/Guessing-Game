import React from "react";
import { useGameLogic } from "../../hooks/useGameLogic";
import './GameController.css';
import PointsToggle from "../PointsToggle/PointsToggle";
import MultiplierToggle from "../MultiplierToggle/MultiplierToggle";
import SpeedControl from "../SpeedControl/SpeedControl";
import CurrentRound from "../CurrentRound/CurrentRound";

/**
 * GameController component for managing the game process.
 */
const GameController: React.FC = () => {
  const {
    speedValue,
    setSpeedValue,
    pointsValue,
    setPointsValue,
    multiplierValue,
    setMultiplierValue,
    autoplayersValue,
    startFunction,
    animationShow,
    userBalance,
  } = useGameLogic();

  return (
    <div className="start-section">
      <div className="row mb-3">
        <div className="col-12 col-md-6">
          <PointsToggle
            pointsValue={pointsValue}
            userBalance={userBalance}
            onPointsChange={setPointsValue}
          />
        </div>

        <div className="col-12 col-md-6">
          <MultiplierToggle
            multiplierValue={multiplierValue}
            onMultiplierChange={setMultiplierValue}
          />
        </div>
      </div>

      <button
        className="btn btn-primary start-button"
        onClick={startFunction}
        disabled={animationShow}
      >
        {animationShow ? "Started" : "Start"}
      </button>

      <div className="card-title mt-3">🏆 Current round</div>
      <CurrentRound autoplayersValue={autoplayersValue} />

      <div className="card-title mt-3">⌛ Speed</div>
      <SpeedControl speedValue={speedValue} onSpeedChange={setSpeedValue} />
    </div>
  );
}

export default GameController;
