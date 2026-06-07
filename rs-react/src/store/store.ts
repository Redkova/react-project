import { configureStore } from '@reduxjs/toolkit';
import submittedFormsReducer from './submittedFormsSlice';

export const store = configureStore({
  reducer: {
    submissions: submittedFormsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
