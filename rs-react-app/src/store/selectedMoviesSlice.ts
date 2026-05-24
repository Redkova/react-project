import { createSlice } from '@reduxjs/toolkit';
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
  reducers: {},
});

export default selectedMoviesSlice.reducer;
