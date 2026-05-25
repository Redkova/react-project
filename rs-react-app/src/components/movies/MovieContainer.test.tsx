import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { fetchMovies } from '../../api/services/movieService';
import type { ComponentProps } from 'react';
import SearchSection from '../search/SearchSection';
import ResultsSection from './ResultSection';
import { useSearchParams } from 'react-router';

vi.mock('react-router', async () => {
  const actual =
    await vi.importActual<typeof import('react-router')>('react-router');

  return {
    ...actual,

    useSearchParams: vi.fn(),
    useNavigate: () => vi.fn(),

    Navigate: ({ to }: { to: string }) => (
      <div data-testid="mock-navigate">{to}</div>
    ),

    Outlet: () => <div data-testid="mock-outlet">OUTLET</div>,

    Link: function LinkMock(props: { to: string; children: React.ReactNode }) {
      return <a href={props.to}>{props.children}</a>;
    },
  };
});

import MovieContainer from './MovieContainer';

const mockedUseSearchParams = vi.mocked(useSearchParams);
const mockedFetchMovies = vi.mocked(fetchMovies);

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

describe('MovieContainer', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockedUseSearchParams.mockReturnValue([
      new URLSearchParams({ search: '', page: '1' }),
      vi.fn(),
    ]);

    mockedFetchMovies.mockResolvedValue({
      movies: [],
      error: null,
    });
  });

  it('loads default movies when no search is provided', async () => {
    render(<MovieContainer />);

    await waitFor(() => {
      expect(mockedFetchMovies).toHaveBeenCalledWith('star', 1);
    });
  });

  it('loads movies based on URL search and page', async () => {
    mockedUseSearchParams.mockReturnValue([
      new URLSearchParams({ search: 'Matrix', page: '3' }),
      vi.fn(),
    ]);

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
    const setParams = vi.fn();

    mockedUseSearchParams.mockReturnValue([
      new URLSearchParams({ search: '', page: '1' }),
      setParams,
    ]);

    render(<MovieContainer />);

    await user.click(screen.getByTestId('search-long'));

    expect(setParams).toHaveBeenCalledWith(
      new URLSearchParams({ search: 'Batman', page: '1' })
    );
  });

  it('goes to next page', async () => {
    const user = userEvent.setup();
    const setParams = vi.fn();

    mockedUseSearchParams.mockReturnValue([
      new URLSearchParams({ search: 'Batman', page: '1' }),
      setParams,
    ]);

    render(<MovieContainer />);

    await user.click(screen.getByTestId('next'));

    expect(setParams).toHaveBeenCalledWith(
      new URLSearchParams({ search: 'Batman', page: '2' })
    );
  });

  it('goes to previous page', async () => {
    const user = userEvent.setup();
    const setParams = vi.fn();

    mockedUseSearchParams.mockReturnValue([
      new URLSearchParams({ search: 'Batman', page: '3' }),
      setParams,
    ]);

    render(<MovieContainer />);

    await user.click(screen.getByTestId('prev'));

    expect(setParams).toHaveBeenCalledWith(
      new URLSearchParams({ search: 'Batman', page: '2' })
    );
  });
});
