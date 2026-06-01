import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import type { OmdbMovie } from '../../api/types';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import ResultsSection from './ResultSection';

vi.mock('./Spinner', () => ({
  default: () => <div data-testid="spinner">Loading...</div>,
}));

vi.mock('./MoviesError', () => ({
  default: ({ message }: { message: string }) => <p>{message}</p>,
}));

vi.mock('./MoviesList', () => ({
  default: ({ movies }: { movies: OmdbMovie[] }) => (
    <div data-testid="movie-list">
      {movies.map((movie) => (
        <span key={movie.imdbID}>{movie.Title}</span>
      ))}
    </div>
  ),
}));

vi.mock('./MoviesPagination', () => ({
  default: () => <div data-testid="pagination">Pagination</div>,
}));

vi.mock('../ui/Button', () => ({
  default: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick: () => void;
  }) => <button onClick={onClick}>{children}</button>,
}));

vi.mock('../../utils/errorMapper', () => ({
  mapMovieError: (err: unknown) => `Mapped: ${String(err)}`,
}));

const movies: OmdbMovie[] = [
  {
    Title: 'Matrix',
    Year: '1999',
    imdbID: '1',
    Poster: '',
    Type: 'movie',
  },
];

const defaultProps = {
  movies: [],
  loading: false,
  fetching: false,
  error: null,
  onNext: vi.fn(),
  onPrev: vi.fn(),
  page: 1,
  isFirstPage: false,
  isLastPage: false,
  onRefresh: vi.fn(),
};

describe('ResultsSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders column headers', () => {
    render(<ResultsSection {...defaultProps} />);
    expect(screen.getByText('Movie name')).toBeInTheDocument();
    expect(screen.getByText('Year')).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(<ResultsSection {...defaultProps} error="Boom" />);
    expect(screen.getByText('Mapped: Boom')).toBeInTheDocument();
  });

  it('shows empty state when no movies', () => {
    render(<ResultsSection {...defaultProps} />);
    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('renders movie list and pagination when movies exist', () => {
    render(<ResultsSection {...defaultProps} movies={movies} />);

    expect(screen.getByText('Matrix')).toBeInTheDocument();
    expect(screen.getByTestId('movie-list')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('calls onRefresh when Refresh button is clicked', async () => {
    const user = userEvent.setup();
    render(<ResultsSection {...defaultProps} />);

    await user.click(screen.getByRole('button', { name: 'Refresh' }));

    expect(defaultProps.onRefresh).toHaveBeenCalledTimes(1);
  });

  it('shows ErrorBoundary when simulate error is clicked', async () => {
    const user = userEvent.setup();
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <ResultsSection {...defaultProps} />
      </ErrorBoundary>
    );

    await user.click(screen.getByRole('button', { name: 'Simulate Error' }));
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    spy.mockRestore();
  });
});
