import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUsersRanking } from "../store/reduxStoreSlice";
import { random } from "../utils/randomUtil";

// Define the shape of a player
interface Player {
  id: number;
  name: string;
  point: any;
  multiplier: any;
  score: number;
}

/**
 * Custom hook for managing autoplayers logic.
 * @param pointsValue The current value of points.
 * @param multiplierValue The current value of the multiplier.
 * @returns An object containing autoplayers value and the function to generate autoplayers.
 */
export const useAutoplayers = (pointsValue: number, multiplierValue: number) => {
  const dispatch = useDispatch();
  const [autoplayersValue, setAutoplayersValue] = useState<Player[]>([]);

  // Initialize autoplayers on component mount
  useEffect(() => {
    const autoplayersGuess: Player[] = [];
    for (let i = 0; i < 5; i++) {
      const data: Player = {
        id: i,
        name: i === 0 ? "You" : `Bot ${i}`,
        point: "-",
        multiplier: "-",
        score: 0,
      };
      autoplayersGuess.push(data);
    }
    setAutoplayersValue(autoplayersGuess);
    dispatch(setUsersRanking(autoplayersGuess));
  }, [dispatch]);

  /**
   * Generate guesses for autoplayers.
   */
  const generateAutoplayers = () => {
    const autoplayersGuess: Player[] = [];
    const data: Player = {
      id: 0,
      name: "You",
      point: pointsValue,
      multiplier: multiplierValue,
      score: Math.round(pointsValue * multiplierValue),
    };
    autoplayersGuess.push(data);

    // Generate guesses for 4 bots
    for (let i = 0; i < 4; i++) {
      const p = random(1, 700, 0);
      const m = random(1, 4, 2);
      autoplayersGuess.push({
        id: i + 1,
        name: `Bot ${i + 1}`,
        point: p,
        multiplier: m,
        score: Math.round(p * m),
      });
    }
    setAutoplayersValue(autoplayersGuess);
    dispatch(setUsersRanking(autoplayersGuess));
  };

  return { autoplayersValue, generateAutoplayers };
};
