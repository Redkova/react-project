import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { OmdbMovie } from '../api/types';

interface SelectedMoviesState {
  movieItems: OmdbMovie[];
}

const initialState: SelectedMoviesState = {
  movieItems: [],
};

const selectedMoviesSlice = createSlice({
  name: 'selectedMovies',
  initialState,
  reducers: {
    toggleMovieSelection(state, action: PayloadAction<OmdbMovie>) {
      const isMovieSelected = state.movieItems.some(
        (m) => m.imdbID === action.payload.imdbID
      );

      if (isMovieSelected) {
        state.movieItems = state.movieItems.filter(
          (m) => m.imdbID !== action.payload.imdbID
        );
      } else {
        state.movieItems.push(action.payload);
      }
    },

    unselectMovie(state, action: PayloadAction<string>) {
      state.movieItems = state.movieItems.filter(
        (m) => m.imdbID !== action.payload
      );
    },

    unselectAllMovies(state) {
      state.movieItems = [];
    },
  },
});

export const { toggleMovieSelection, unselectMovie, unselectAllMovies } =
  selectedMoviesSlice.actions;

export default selectedMoviesSlice.reducer;
