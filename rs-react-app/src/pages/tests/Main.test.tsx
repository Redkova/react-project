import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import MovieContainer from '../Main';
import type { OmdbMovie } from '../../api/types';
import type { ComponentProps } from 'react';

vi.mock('react-router', async () => {
  const actual =
    await vi.importActual<typeof import('react-router')>('react-router');

  return {
    ...actual,

    Navigate: ({ to }: { to: string }) => (
      <div data-testid="mock-navigate">{to}</div>
    ),

    Outlet: () => <div data-testid="mock-outlet">OUTLET</div>,
  };
});

const updateParams = vi.fn();

let mockParams = {
  search: '',
  page: 1,
  details: null as string | null,
};

vi.mock('../../hooks/useMovieParams', () => ({
  useMovieParams: () => ({
    search: mockParams.search,
    page: mockParams.page,
    details: mockParams.details,
    updateParams,
  }),
}));

let savedSearch = 'star';
const setSavedSearch = vi.fn((v: string) => (savedSearch = v));

vi.mock('../../hooks/useLocalStorage', () => ({
  useLocalStorage: () => [savedSearch, setSavedSearch] as const,
}));

const refetch = vi.fn();

let mockQueryResult = {
  data: { Search: [] as OmdbMovie[] },
  isLoading: false,
  isFetching: false,
  error: null as unknown,
  refetch,
};

vi.mock('../../api/api', () => ({
  useSearchMoviesQuery: vi.fn(() => mockQueryResult),
  movieApi: {
    util: {
      invalidateTags: vi.fn(),
    },
  },
}));

vi.mock('react-redux', () => ({
  useDispatch: () => vi.fn(),
}));

import SearchSection from '../../components/layout/search/SearchSection';
import ResultsSection from '../../components/layout/resultSection/ResultSection';

type SearchSectionProps = ComponentProps<typeof SearchSection>;
type ResultsSectionProps = ComponentProps<typeof ResultsSection>;

vi.mock('../../components/layout/search/SearchSection', () => ({
  default: (props: SearchSectionProps) => (
    <div>
      <input data-testid="search-input" defaultValue={props.initialValue} />
      <div data-testid="search-error">{props.error}</div>
      <button
        data-testid="search-long"
        onClick={() => props.onSearch('Batman')}
      />
      <button data-testid="search-short" onClick={() => props.onSearch('ab')} />
    </div>
  ),
}));

vi.mock('../../components/layout/resultSection/ResultSection', () => ({
  default: (props: ResultsSectionProps) => (
    <div>
      <div data-testid="loading">{props.loading ? 'loading' : 'idle'}</div>
      <div data-testid="error">{String(props.error ?? '')}</div>
      <div data-testid="page">{props.page}</div>

      <div data-testid="movies">
        {props.movies.map((m) => (
          <span key={m.imdbID}>{m.Title}</span>
        ))}
      </div>

      <button data-testid="next" onClick={props.onNext} />
      <button data-testid="prev" onClick={props.onPrev} />
      <button data-testid="refresh" onClick={props.onRefresh} />
    </div>
  ),
}));

describe('MovieContainer', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockParams = { search: '', page: 1, details: null };
    savedSearch = 'star';

    mockQueryResult = {
      data: { Search: [] },
      isLoading: false,
      isFetching: false,
      error: null,
      refetch,
    };
  });

  it('loads default movies when no search is provided', async () => {
    render(<MovieContainer />);

    await waitFor(() => {
      expect(mockQueryResult.data.Search).toEqual([]);
    });
  });

  it('renders fetched movies', async () => {
    mockQueryResult.data = {
      Search: [
        {
          Title: 'Matrix',
          Year: '1999',
          imdbID: '1',
          Poster: '',
          Type: 'movie',
        },
      ],
    };

    render(<MovieContainer />);

    expect(await screen.findByText('Matrix')).toBeInTheDocument();
  });

  it('handles successful search', async () => {
    const user = userEvent.setup();

    render(<MovieContainer />);

    await user.click(screen.getByTestId('search-long'));

    expect(setSavedSearch).toHaveBeenCalledWith('Batman');
    expect(updateParams).toHaveBeenCalledWith({
      search: 'Batman',
      page: '1',
      details: null,
    });
  });

  it('goes to next page', async () => {
    const user = userEvent.setup();

    mockParams = { search: 'Batman', page: 1, details: null };

    render(<MovieContainer />);

    await user.click(screen.getByTestId('next'));

    expect(updateParams).toHaveBeenCalledWith({
      search: 'Batman',
      page: '2',
    });
  });

  it('goes to previous page', async () => {
    const user = userEvent.setup();

    mockParams = { search: 'Batman', page: 3, details: null };

    render(<MovieContainer />);

    await user.click(screen.getByTestId('prev'));

    expect(updateParams).toHaveBeenCalledWith({
      search: 'Batman',
      page: '2',
    });
  });

  it('navigates to /404 when page < 1', () => {
    mockParams = { search: 'Batman', page: 0, details: null };

    render(<MovieContainer />);

    expect(screen.getByTestId('mock-navigate')).toHaveTextContent('/404');
  });

  it('refresh triggers invalidateTags + refetch', async () => {
    const user = userEvent.setup();
    const invalidate = vi.mocked(
      (await import('../../api/api')).movieApi.util.invalidateTags
    );

    render(<MovieContainer />);

    await user.click(screen.getByTestId('refresh'));

    expect(invalidate).toHaveBeenCalledWith(['Movies']);
    expect(refetch).toHaveBeenCalled();
  });

  it('renders Outlet when details param exists', () => {
    mockParams = { search: 'Batman', page: 1, details: 'tt123' };

    render(<MovieContainer />);

    const outlets = screen.getAllByTestId('mock-outlet');
    expect(outlets.length).toBeGreaterThan(0);
  });

  it('shows spinner when isLoading is true', () => {
    mockQueryResult = {
      data: null,
      isLoading: true,
      isFetching: false,
      error: null,
      refetch,
    };

    render(<MovieContainer />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('shows spinner when isFetching is true', () => {
    mockQueryResult = {
      data: null,
      isLoading: false,
      isFetching: true,
      error: null,
      refetch,
    };

    render(<MovieContainer />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('does not show spinner when not loading or fetching', () => {
    mockQueryResult = {
      data: { Search: [] },
      isLoading: false,
      isFetching: false,
      error: null,
      refetch,
    };

    render(<MovieContainer />);

    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });
});
