import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Player, setUsersRanking } from "../store/reduxStoreSlice";
import { AppDispatch } from "../store/store";
import { random } from "../utils/randomUtil";

const createInitialPlayers = (): Player[] =>
  Array.from({ length: 5 }, (_, index) => ({
    id: index,
    name: index === 0 ? "You" : `Bot ${index}`,
    point: "-",
    multiplier: "-",
    score: 0,
  }));

/**
 * Custom hook for managing autoplayers logic.
 * @param pointsValue The current value of points.
 * @param multiplierValue The current value of the multiplier.
 * @returns An object containing autoplayers value and the function to generate autoplayers.
 */
export const useAutoplayers = (pointsValue: number, multiplierValue: number) => {
  const dispatch = useDispatch<AppDispatch>();
  const [autoplayersValue, setAutoplayersValue] = useState<Player[]>(createInitialPlayers);

  useEffect(() => {
    dispatch(setUsersRanking(autoplayersValue));
  }, [autoplayersValue, dispatch]);

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
  };

  return { autoplayersValue, generateAutoplayers };
};
