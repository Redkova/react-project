import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import type { OmdbMovie } from '../../api/types';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import { mockReactRouter } from '../../test-utils/mockReactRouter';
import { useSearchParams } from 'react-router';

mockReactRouter();
import ResultsSection from './ResultSection';

const mockedUseSearchParams = vi.mocked(useSearchParams);

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
  error: null,
  onNext: vi.fn(),
  onPrev: vi.fn(),
  page: 1,
  isFirstPage: false,
  isLastPage: false,
};

describe('ResultsSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockedUseSearchParams.mockReturnValue([
      new URLSearchParams({ page: '1' }),
      vi.fn(),
    ]);
  });

  it('renders column headers', () => {
    render(<ResultsSection {...defaultProps} />);
    expect(screen.getByText('Movie name')).toBeInTheDocument();
    expect(screen.getByText('Year')).toBeInTheDocument();
  });

  it('shows spinner when loading', () => {
    render(<ResultsSection {...defaultProps} loading={true} />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(<ResultsSection {...defaultProps} error="Something went wrong" />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('shows empty state when no movies', () => {
    render(<ResultsSection {...defaultProps} />);
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('renders movie list when data exists', () => {
    render(<ResultsSection {...defaultProps} movies={movies} />);
    expect(screen.getByText('Matrix')).toBeInTheDocument();
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
