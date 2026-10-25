import { configureStore } from '@reduxjs/toolkit';
import selectedMoviesReducer from './selectedMoviesSlice';

export const store = configureStore({
  reducer: {
    selectedMovies: selectedMoviesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
