import React from "react";

interface MultiplierToggleProps {
  multiplierValue: number;
  onMultiplierChange: (value: number) => void;
}

/**
 * MultiplierToggle component for adjusting the multiplier.
 */
const MultiplierToggle: React.FC<MultiplierToggleProps> = ({ multiplierValue, onMultiplierChange }) => {
  const multiplierMinus = () => {
    if (multiplierValue >= 1.25) onMultiplierChange(multiplierValue - 0.25);
  };

  const multiplierPlus = () => {
    if (10 >= multiplierValue + 0.25) onMultiplierChange(multiplierValue + 0.25);
  };

  return (
    <div className="card-box info-box toggle">
      <div className="toggle-title">Multiplier</div>
      <div className="toggle-menu">
        <div
          className="toggle-minus option"
          role="button"
          tabIndex={0}
          onClick={multiplierMinus}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              multiplierMinus();
            }
          }}
        >
          ▼
        </div>

        <input
          type="number"
          className="toggle-input"
          min="1"
          max="10"
          step="0.25"
          onChange={(e) => onMultiplierChange(Number(e.target.value))}
          value={multiplierValue}
        />
        <button className="toggle-plus option" onClick={multiplierPlus}>
          ▲
        </button>
      </div>
    </div>
  );
};

export default MultiplierToggle;
