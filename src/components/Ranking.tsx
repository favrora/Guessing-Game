import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store"; // Ensure the correct import path for RootState
import '../assets/styles/Ranking.css';

// Define the shape of a player in the ranking
interface Player {
  id: number;
  name: string;
  score: number;
}

/**
 * Ranking component for displaying the leaderboard.
 */
const Ranking: React.FC = () => {
  const ranking = useSelector((state: RootState) => state.reduxStore.usersRanking) as Player[];
  const animationShow = useSelector((state: RootState) => state.reduxStore.animShow);

  // Memoize the sorted ranking array to avoid unnecessary calculations
  const sortedRanking = useMemo(() => {
    return [...ranking].sort((a, b) => b.score - a.score);
  }, [ranking]);

  return (
    <div className="col-12 col-md-6">
      <div className="card-title">📊 Ranking</div>

      <div className="card-box ranking-box">
        <table className="ranking-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {sortedRanking.map((player, index) => (
              <tr
                key={player.id}
                className={
                  player.name === "You" && !animationShow && player.score !== 0
                    ? "my-result"
                    : ""
                }
              >
                <td>{index + 1}</td>
                <td>{animationShow || player.score === 0 ? "-" : player.name}</td>
                <td>{animationShow || player.score === 0 ? "-" : player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Ranking;
