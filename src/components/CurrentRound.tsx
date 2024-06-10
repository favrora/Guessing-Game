import React from "react";

interface Player {
  id: number;
  name: string;
  point: any;
  multiplier: any;
  score: number;
}

interface CurrentRoundProps {
  autoplayersValue: Player[];
}

/**
 * CurrentRound component for displaying the current round's participants.
 */
const CurrentRound: React.FC<CurrentRoundProps> = ({ autoplayersValue }) => {
  return (
    <div className="card-box round-box">
      <table className="ranking-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Point</th>
            <th>Multiplier</th>
          </tr>
        </thead>
        <tbody>
          {autoplayersValue.map((user, index) => (
            <tr key={user.id} className={index === 0 ? "my-result" : ""}>
              <td>{user.name}</td>
              <td>{user.point}</td>
              <td>{user.multiplier}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrentRound;
