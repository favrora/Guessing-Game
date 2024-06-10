import React from "react";

interface PointsToggleProps {
  pointsValue: number;
  userBalance: number;
  onPointsChange: (value: number) => void;
}

/**
 * PointsToggle component for adjusting points.
 */
const PointsToggle: React.FC<PointsToggleProps> = ({ pointsValue, userBalance, onPointsChange }) => {
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
        <div
          className="toggle-minus option"
          role="button"
          tabIndex={0}
          onClick={pointsMinus}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              pointsMinus();
            }
          }}
        >
          ▼
        </div>
        <input
          type="number"
          className="toggle-input"
          min="0"
          max={userBalance}
          step="25"
          onChange={(e) => onPointsChange(Number(e.target.value))}
          value={pointsValue}
        />
        <button className="toggle-plus option" onClick={pointsPlus}>
          ▲
        </button>
      </div>
    </div>
  );
};

export default PointsToggle;
