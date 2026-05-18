import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { fetchMovies } from '../../api/services/movieService';
import { storage } from '../../utils/storage';
import type { ComponentProps } from 'react';
import SearchSection from '../search/SearchSection';
import ResultsSection from './ResultSection';
import { mockReactRouter } from '../../test-utils/mockReactRouter';
import { useSearchParams } from 'react-router';

mockReactRouter();
import MovieContainer from './MovieContainer';

const mockedUseSearchParams = vi.mocked(useSearchParams);

type SearchProps = ComponentProps<typeof SearchSection>;
type ResultsProps = ComponentProps<typeof ResultsSection>;

vi.mock('../search/SearchSection', () => ({
  default: ({ onSearch, initialValue }: SearchProps) => (
    <div>
      <input data-testid="search-input" defaultValue={initialValue} />
      <button data-testid="search-long" onClick={() => onSearch('Batman')} />
      <button data-testid="search-short" onClick={() => onSearch('ab')} />
    </div>
  ),
}));

vi.mock('./ResultSection', () => ({
  default: ({ movies, loading, error, page, onNext, onPrev }: ResultsProps) => (
    <div>
      <div data-testid="loading">{loading ? 'loading' : 'idle'}</div>
      <div data-testid="error">{error}</div>
      <div data-testid="page">{page}</div>
      <div data-testid="movies">
        {movies.map((m) => (
          <span key={m.imdbID}>{m.Title}</span>
        ))}
      </div>
      <button data-testid="next" onClick={onNext} />
      <button data-testid="prev" onClick={onPrev} />
    </div>
  ),
}));

vi.mock('../../api/services/movieService', () => ({
  fetchMovies: vi.fn(),
}));

vi.mock('../../utils/storage', () => ({
  storage: {
    getSearch: vi.fn(),
    getPage: vi.fn(),
    setSearch: vi.fn(),
    setPage: vi.fn(),
  },
}));

const mockedFetchMovies = vi.mocked(fetchMovies);
const mockedStorage = vi.mocked(storage);

describe('MovieContainer', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockedUseSearchParams.mockReturnValue([new URLSearchParams(), vi.fn()]);

    mockedStorage.getSearch.mockReturnValue('');
    mockedStorage.getPage.mockReturnValue(1);

    mockedFetchMovies.mockResolvedValue({
      movies: [],
      error: null,
    });
  });

  it('loads default movies when no saved search exists', async () => {
    render(<MovieContainer />);

    await waitFor(() => {
      expect(mockedFetchMovies).toHaveBeenCalledWith('star', 1);
    });
  });

  it('loads saved search and page from storage', async () => {
    mockedStorage.getSearch.mockReturnValue('Matrix');
    mockedStorage.getPage.mockReturnValue(3);

    render(<MovieContainer />);

    await waitFor(() => {
      expect(mockedFetchMovies).toHaveBeenCalledWith('Matrix', 3);
    });
  });

  it('renders fetched movies', async () => {
    mockedFetchMovies.mockResolvedValue({
      movies: [
        {
          Title: 'Matrix',
          Year: '1999',
          imdbID: '1',
          Poster: '',
          Type: 'movie',
        },
      ],
      error: null,
    });

    render(<MovieContainer />);

    expect(await screen.findByText('Matrix')).toBeInTheDocument();
  });

  it('shows error if search is too short', async () => {
    const user = userEvent.setup();

    render(<MovieContainer />);

    await user.click(screen.getByTestId('search-short'));

    expect(
      screen.getByText('Please enter at least 3 characters')
    ).toBeInTheDocument();

    expect(mockedFetchMovies).toHaveBeenCalledTimes(1);
  });

  it('handles successful search', async () => {
    const user = userEvent.setup();

    render(<MovieContainer />);

    await user.click(screen.getByTestId('search-long'));

    await waitFor(() => {
      expect(mockedStorage.setSearch).toHaveBeenCalledWith('Batman');
      expect(mockedStorage.setPage).toHaveBeenCalledWith(1);
      expect(mockedFetchMovies).toHaveBeenCalledWith('Batman', 1);
    });
  });

  it('goes to next page', async () => {
    const user = userEvent.setup();

    mockedStorage.getSearch.mockReturnValue('Batman');

    render(<MovieContainer />);

    await user.click(screen.getByTestId('next'));

    await waitFor(() => {
      expect(mockedStorage.setPage).toHaveBeenCalledWith(2);
      expect(mockedFetchMovies).toHaveBeenCalledWith('Batman', 2);
    });
  });

  it('goes to previous page', async () => {
    const user = userEvent.setup();

    mockedStorage.getSearch.mockReturnValue('Batman');
    mockedStorage.getPage.mockReturnValue(3);

    render(<MovieContainer />);

    await waitFor(() => {
      expect(mockedFetchMovies).toHaveBeenCalledWith('Batman', 3);
    });

    await user.click(screen.getByTestId('prev'));

    await waitFor(() => {
      expect(mockedStorage.setPage).toHaveBeenCalledWith(2);
      expect(mockedFetchMovies).toHaveBeenLastCalledWith('Batman', 2);
    });
  });
});
