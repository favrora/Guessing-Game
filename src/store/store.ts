// src/store/store.ts

import { configureStore } from '@reduxjs/toolkit';
import reduxStoreReducer from './reduxStoreSlice';

const store = configureStore({
  reducer: {
    reduxStore: reduxStoreReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
