import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './store';

export const selectSelectedMovies = (state: RootState) =>
  state.selectedMovies.movieItems;

export const selectSelectedMoviesCount = createSelector(
  [selectSelectedMovies],
  (movies) => movies.length
);
