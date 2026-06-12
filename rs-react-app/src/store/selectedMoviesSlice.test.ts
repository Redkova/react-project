import reducer, {
  toggleMovieSelection,
  unselectMovie,
  unselectAllMovies,
} from './selectedMoviesSlice';
import type { OmdbMovie } from '../api/types';

interface TestState {
  movieItems: OmdbMovie[];
}

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
    expect(state.movieItems).toEqual([]);
  });

  it('should add a movie when toggled and not selected', () => {
    const initial: TestState = { movieItems: [] };

    const state = reducer(initial, toggleMovieSelection(movie1));

    expect(state.movieItems).toEqual([movie1]);
  });

  it('should remove a movie when toggled and already selected', () => {
    const initial: TestState = { movieItems: [movie1] };

    const state = reducer(initial, toggleMovieSelection(movie1));

    expect(state.movieItems).toEqual([]);
  });

  it('should unselect a specific movie', () => {
    const initial: TestState = { movieItems: [movie1, movie2] };

    const state = reducer(initial, unselectMovie('1'));

    expect(state.movieItems).toEqual([movie2]);
  });

  it('should unselect all movies', () => {
    const initial: TestState = { movieItems: [movie1, movie2] };

    const state = reducer(initial, unselectAllMovies());

    expect(state.movieItems).toEqual([]);
  });
});
