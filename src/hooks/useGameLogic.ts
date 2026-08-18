import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { AppDispatch, RootState } from "../store/store";
import {
  generateVal,
  speedStateVal,
  animStateVal,
  updateBalanceVal,
} from "../store/reduxStoreSlice";
import { useAutoplayers } from "./useAutoplayers";
import { random } from "../utils/randomUtil";

/**
 * Custom hook for managing game logic.
 * @returns An object containing game state and functions to manage the game.
 */
export const useGameLogic = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [speedValue, setSpeedValue] = useState<number>(1);
  const [pointsValue, setPointsValue] = useState<number>(50);
  const [multiplierValue, setMultiplierValue] = useState<number>(1.0);
  const roundTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { autoplayersValue, generateAutoplayers } = useAutoplayers(pointsValue, multiplierValue);

  const animationShow = useSelector((state: RootState) => state.reduxStore.animShow);
  const userBalance = useSelector((state: RootState) => state.reduxStore.balance);

  /**
   * Start the game with the current settings.
   */
  const startFunction = () => {
    if (animationShow) {
      return;
    }

    if (pointsValue > userBalance) {
      toast("Not enough points to start", {
        duration: 4000,
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
      return;
    }

    const result = random(1, 9, 2);
    const balanceAfterBet = userBalance - pointsValue;
    const winnings = result >= multiplierValue ? Math.round(pointsValue * multiplierValue) : 0;

    dispatch(speedStateVal(speedValue));
    generateAutoplayers();
    dispatch(generateVal(result));
    dispatch(updateBalanceVal(balanceAfterBet));

    roundTimer.current = setTimeout(() => {
      dispatch(updateBalanceVal(balanceAfterBet + winnings));
      dispatch(animStateVal(false));
      roundTimer.current = null;
    }, calcTimeout());
  };

  useEffect(() => {
    return () => {
      if (roundTimer.current) {
        clearTimeout(roundTimer.current);
      }
    };
  }, []);

  /**
   * Calculate the timeout duration based on speedValue.
   * @returns {number} - Timeout duration in milliseconds.
   */
  const calcTimeout = (): number => {
    return 3000 / speedValue;
  };

  return {
    speedValue,
    setSpeedValue,
    pointsValue,
    setPointsValue,
    multiplierValue,
    setMultiplierValue,
    autoplayersValue,
    startFunction,
    animationShow,
    userBalance,
  };
};
