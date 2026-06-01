import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import MovieContainer from './MovieContainer';
import { movieApi } from '../../api/api';
import selectedMoviesReducer from '../../store/selectedMoviesSlice';

function setupStore() {
  return configureStore({
    reducer: {
      selectedMovies: selectedMoviesReducer,
      [movieApi.reducerPath]: movieApi.reducer,
    },
    middleware: (gDM) => gDM().concat(movieApi.middleware),
  });
}

beforeEach(() => {
  vi.resetAllMocks();

  globalThis.fetch = vi.fn(() =>
    Promise.resolve(
      new Response(
        JSON.stringify({
          Search: [
            {
              Title: 'Devil Movie',
              Year: '2020',
              imdbID: 'tt123',
              Poster: '',
              Type: 'movie',
            },
          ],
          totalResults: '1',
          Response: 'True',
        }),
        { status: 200 }
      )
    )
  );
});

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const actual =
    await vi.importActual<typeof import('react-router')>('react-router');

  return {
    ...actual,
    useNavigate: () => mockNavigate,
    Outlet: () => <div />,
  };
});

vi.mock('../../hooks/useMovieParams', () => ({
  useMovieParams: () => ({
    search: 'devil',
    page: 1,
    details: null,
    updateParams: vi.fn(),
  }),
}));

vi.mock('../../hooks/useLocalStorage', () => ({
  useLocalStorage: () => ['devil', vi.fn()] as const,
}));

describe('MovieContainer — RTK Query caching', () => {
  it('uses cached data on second mount (no extra fetch)', async () => {
    const store = setupStore();

    const { unmount } = render(
      <Provider store={store}>
        <MovieContainer />
      </Provider>
    );

    await screen.findByText('Devil Movie');

    unmount();

    render(
      <Provider store={store}>
        <MovieContainer />
      </Provider>
    );

    await screen.findByText('Devil Movie');

    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
  });

  it('refetches after invalidateTags', async () => {
    const store = setupStore();

    const { unmount } = render(
      <Provider store={store}>
        <MovieContainer />
      </Provider>
    );

    await screen.findByText('Devil Movie');

    store.dispatch(movieApi.util.invalidateTags(['Movies']));

    unmount();

    render(
      <Provider store={store}>
        <MovieContainer />
      </Provider>
    );

    await screen.findByText('Devil Movie');

    expect(globalThis.fetch).toHaveBeenCalledTimes(2);
  });
});
