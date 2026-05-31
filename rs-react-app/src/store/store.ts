import { configureStore } from '@reduxjs/toolkit';
import selectedMoviesReducer from './selectedMoviesSlice';
import { movieApi } from '../api/api';

export const store = configureStore({
  reducer: {
    selectedMovies: selectedMoviesReducer,
    [movieApi.reducerPath]: movieApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(movieApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
