import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';

import { movieApi } from './api';
import type { OmdbMovieSearchResponse, OmdbMovieDetails } from './types';

const createStore = () =>
  configureStore({
    reducer: {
      [movieApi.reducerPath]: movieApi.reducer,
    },
    middleware: (gDM) => gDM().concat(movieApi.middleware),
  });

describe('movieApi', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('searchMovies returns movies', async () => {
    const response: OmdbMovieSearchResponse = {
      Search: [
        {
          imdbID: 'tt0133093',
          Title: 'The Matrix',
          Year: '1999',
          Type: 'movie',
          Poster: 'poster.jpg',
        },
      ],
      totalResults: '1',
      Response: 'True',
    };

    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify(response), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    );

    const store = createStore();

    const result = await store.dispatch(
      movieApi.endpoints.searchMovies.initiate({
        query: 'matrix',
        page: 1,
      })
    );

    expect(result.data).toEqual(response);
  });

  it('getMovieDetails returns movie details', async () => {
    const response: OmdbMovieDetails = {
      Title: 'Matrix',
      Year: '1999',
      imdbID: '1',
      Poster: 'poster.jpg',
      Genre: 'Action',
      Country: 'USA',
      imdbRating: '8.7',
      Actors: 'Keanu Reeves',
      Plot: 'Some plot',
      Response: 'True',
    };

    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify(response), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    );

    const store = createStore();

    const result = await store.dispatch(
      movieApi.endpoints.getMovieDetails.initiate('tt0133093')
    );

    expect(result.data).toEqual(response);
  });

  it('handles network error', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network Error'));

    const store = createStore();

    const result = await store.dispatch(
      movieApi.endpoints.searchMovies.initiate({
        query: 'matrix',
        page: 1,
      })
    );

    expect(result.error).toBeDefined();
  });
});
