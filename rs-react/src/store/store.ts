import { configureStore } from '@reduxjs/toolkit';
import submittedFormsReducer from './submittedFormsSlice';
import countriesReducer from './countriesSlice';

export const store = configureStore({
  reducer: {
    submittedForms: submittedFormsReducer,
    countries: countriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
