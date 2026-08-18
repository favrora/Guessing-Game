import { Player } from "../../store/reduxStoreSlice";

interface CurrentRoundProps {
  autoplayersValue: Player[];
}

/**
 * CurrentRound component for displaying the current round's participants.
 */
const CurrentRound = ({ autoplayersValue }: CurrentRoundProps) => {
  return (
    <div className="card-box round-box">
      <table className="ranking-table" aria-label="Current round players">
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
