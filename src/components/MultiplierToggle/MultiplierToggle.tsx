interface MultiplierToggleProps {
  multiplierValue: number;
  onMultiplierChange: (value: number) => void;
}

/**
 * MultiplierToggle component for adjusting the multiplier.
 */
const MultiplierToggle = ({ multiplierValue, onMultiplierChange }: MultiplierToggleProps) => {
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
        <button
          type="button"
          className="toggle-minus option"
          onClick={multiplierMinus}
          aria-label="Decrease multiplier"
          disabled={multiplierValue <= 1}
        >
          ▼
        </button>

        <input
          type="number"
          className="toggle-input"
          min="1"
          max="10"
          step="0.25"
          aria-label="Multiplier"
          onChange={(e) => {
            const value = Number(e.target.value);
            onMultiplierChange(Math.min(Math.max(value, 1), 10));
          }}
          value={multiplierValue}
        />
        <button
          type="button"
          className="toggle-plus option"
          onClick={multiplierPlus}
          aria-label="Increase multiplier"
          disabled={multiplierValue >= 10}
        >
          ▲
        </button>
      </div>
    </div>
  );
};

export default MultiplierToggle;
