// src/store/reduxStoreSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
  userName: string;
  balance: number;
  generatedValue: number;
  speed: number;
  animShow: boolean;
  usersRanking: any;
}

const initialState: CounterState = {
  userName: "",
  balance: 1000,
  generatedValue: 0,
  speed: 0,
  animShow: false,
  usersRanking: [],
};

export const reduxStore = createSlice({
  name: "reduxStore",
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    generateVal: (state, action: PayloadAction<number>) => {
      state.animShow = true;
      state.generatedValue = action.payload;
    },
    speedStateVal: (state, action: PayloadAction<number>) => {
      state.speed = action.payload;
    },
    animStateVal: (state, action: PayloadAction<boolean>) => {
      state.animShow = action.payload;
    },
    updateBalanceVal: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    setUsersRanking: (state, action: PayloadAction<any>) => {
      state.usersRanking = action.payload;
    },
  },
});

export const {
  setUserName,
  generateVal,
  speedStateVal,
  animStateVal,
  updateBalanceVal,
  setUsersRanking,
} = reduxStore.actions;

export default reduxStore.reducer;
