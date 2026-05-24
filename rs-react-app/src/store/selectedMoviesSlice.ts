import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { OmdbMovie } from '../api/types';

interface SelectedMoviesState {
  selectedMovies: OmdbMovie[];
}

const initialState: SelectedMoviesState = {
  selectedMovies: [],
};

const selectedMoviesSlice = createSlice({
  name: 'selectedMovies',
  initialState,
  reducers: {
    toggleMovieSelection(state, action: PayloadAction<OmdbMovie>) {
      const isMovieSelected = state.selectedMovies.some(
        (m) => m.imdbID === action.payload.imdbID
      );

      if (isMovieSelected) {
        state.selectedMovies = state.selectedMovies.filter(
          (m) => m.imdbID !== action.payload.imdbID
        );
      } else {
        state.selectedMovies.push(action.payload);
      }
    },

    unselectMovie(state, action: PayloadAction<string>) {
      state.selectedMovies = state.selectedMovies.filter(
        (m) => m.imdbID !== action.payload
      );
    },

    unselectAllMovies(state) {
      state.selectedMovies = [];
    },
  },
});

export const { toggleMovieSelection, unselectMovie, unselectAllMovies } =
  selectedMoviesSlice.actions;

export default selectedMoviesSlice.reducer;
