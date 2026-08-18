interface PointsToggleProps {
  pointsValue: number;
  userBalance: number;
  onPointsChange: (value: number) => void;
}

/**
 * PointsToggle component for adjusting points.
 */
const PointsToggle = ({ pointsValue, userBalance, onPointsChange }: PointsToggleProps) => {
  const pointsMinus = () => {
    if (pointsValue > 25) onPointsChange(pointsValue - 25);
  };

  const pointsPlus = () => {
    if (userBalance >= pointsValue + 25) onPointsChange(pointsValue + 25);
  };

  return (
    <div className="card-box info-box toggle">
      <div className="toggle-title">Points</div>
      <div className="toggle-menu">
        <button
          type="button"
          className="toggle-minus option"
          onClick={pointsMinus}
          aria-label="Decrease points"
          disabled={pointsValue <= 25}
        >
          ▼
        </button>
        <input
          type="number"
          className="toggle-input"
          min="0"
          max={userBalance}
          step="25"
          aria-label="Points"
          onChange={(e) => {
            const value = Number(e.target.value);
            onPointsChange(Math.min(Math.max(value, 25), userBalance));
          }}
          value={pointsValue}
        />
        <button
          type="button"
          className="toggle-plus option"
          onClick={pointsPlus}
          aria-label="Increase points"
          disabled={pointsValue + 25 > userBalance}
        >
          ▲
        </button>
      </div>
    </div>
  );
};

export default PointsToggle;
