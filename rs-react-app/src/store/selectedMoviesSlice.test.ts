import reducer, {
  toggleMovieSelection,
  unselectMovie,
  unselectAllMovies,
} from './selectedMoviesSlice';
import type { OmdbMovie } from '../api/types';

const movie1: OmdbMovie = {
  Title: 'Matrix',
  Year: '1999',
  imdbID: '1',
  Poster: '',
  Type: 'movie',
};

const movie2: OmdbMovie = {
  Title: 'Batman',
  Year: '2005',
  imdbID: '2',
  Poster: '',
  Type: 'movie',
};

describe('selectedMoviesSlice', () => {
  it('should return initial state', () => {
    const state = reducer(undefined, { type: 'unknown' });
    expect(state.selectedMovies).toEqual([]);
  });

  it('should add a movie when toggled and not selected', () => {
    const state = reducer({ selectedMovies: [] }, toggleMovieSelection(movie1));

    expect(state.selectedMovies).toEqual([movie1]);
  });

  it('should remove a movie when toggled and already selected', () => {
    const state = reducer(
      { selectedMovies: [movie1] },
      toggleMovieSelection(movie1)
    );

    expect(state.selectedMovies).toEqual([]);
  });

  it('should unselect a specific movie', () => {
    const state = reducer(
      { selectedMovies: [movie1, movie2] },
      unselectMovie('1')
    );

    expect(state.selectedMovies).toEqual([movie2]);
  });

  it('should unselect all movies', () => {
    const state = reducer(
      { selectedMovies: [movie1, movie2] },
      unselectAllMovies()
    );

    expect(state.selectedMovies).toEqual([]);
  });
});
