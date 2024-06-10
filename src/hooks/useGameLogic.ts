import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import { RootState } from "../store/store";
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
  const dispatch = useDispatch();
  const [speedValue, setSpeedValue] = useState<number>(0);
  const [generatedValue, setGeneratedValue] = useState<number>(random(1, 9, 2));
  const [pointsValue, setPointsValue] = useState<number>(50);
  const [multiplierValue, setMultiplierValue] = useState<number>(1.0);

  const { autoplayersValue, generateAutoplayers } = useAutoplayers(pointsValue, multiplierValue);

  const animationShow = useSelector((state: RootState) => state.reduxStore.animShow);
  const userBalance = useSelector((state: RootState) => state.reduxStore.balance);

  /**
   * Start the game with the current settings.
   */
  const startFunction = () => {
    if (userBalance <= 0) {
      toast("Not enough points to start", {
        duration: 4000,
        style: {},
        className: "",
        icon: "⚠️",
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
      return;
    }

    const newGeneratedValue = random(1, 9, 2);
    setGeneratedValue(newGeneratedValue);
    dispatch(speedStateVal(speedValue));
    generateAutoplayers();
    dispatch(generateVal(newGeneratedValue));
    dispatch(updateBalanceVal(userBalance - pointsValue));

    setTimeout(updateBalance, 3000 + 1000 * speedValue);
  };

  /**
   * Update the user's balance after the game round.
   */
  const updateBalance = () => {
    dispatch(animStateVal(false));
    if (generatedValue === multiplierValue) {
      dispatch(updateBalanceVal(userBalance + pointsValue));
    } else {
      dispatch(updateBalanceVal(userBalance - pointsValue));
    }
  };

  return {
    speedValue,
    setSpeedValue,
    generatedValue,
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
