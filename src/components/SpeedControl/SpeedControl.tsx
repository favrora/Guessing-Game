interface SpeedControlProps {
  speedValue: number;
  onSpeedChange: (value: number) => void;
}

/**
 * SpeedControl component for adjusting the speed.
 */
const SpeedControl = ({ speedValue, onSpeedChange }: SpeedControlProps) => {
  return (
    <div className="card-box speed-box">
      <input
        type="range"
        className="speed"
        min="1"
        max="5"
        step="1"
        aria-label="Round speed"
        onChange={(e) => onSpeedChange(Number(e.target.value))}
        value={speedValue}
      />
      <div className="speed-values">
        <div className={speedValue >= 1 ? "selected" : ""}>1x</div>
        <div className={speedValue >= 2 ? "selected" : ""}>2x</div>
        <div className={speedValue >= 3 ? "selected" : ""}>3x</div>
        <div className={speedValue >= 4 ? "selected" : ""}>4x</div>
        <div className={speedValue >= 5 ? "selected" : ""}>5x</div>
      </div>
    </div>
  );
};

export default SpeedControl;
