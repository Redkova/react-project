import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { MovieDetailSection } from '../MovieDetailSection';
import type {
  OmdbMovieDetails,
  MovieDetailsResult,
  OmdbErrorResponse,
} from '../../api/types';
import { useGetMovieDetailsQuery, movieApi } from '../../api/api';
import type { ReactNode } from 'react';

const mockUpdateParams = vi.fn();
const mockDispatch = vi.fn();
const mockRefetch = vi.fn();

vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

vi.mock('../../hooks/useMovieParams', () => ({
  useMovieParams: (): {
    page: number;
    details: string | null;
    updateParams: (p: { details: string | null }) => void;
  } => ({
    page: 2,
    details: 'tt0111161',
    updateParams: mockUpdateParams,
  }),
}));

vi.mock('../../api/api', () => ({
  useGetMovieDetailsQuery: vi.fn(),
  movieApi: {
    util: {
      invalidateTags: vi.fn(),
    },
  },
}));

vi.mock('../../components/ui/PosterImage', () => ({
  PosterImage: ({
    src,
    alt,
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => (src && src !== 'N/A' ? <img src={src} alt={alt} /> : null),
}));

vi.mock('../../components/movies/Spinner', () => ({
  default: () => <div data-testid="spinner">Loading...</div>,
}));

vi.mock('../../components/movies/MoviesError', () => ({
  default: ({ message }: { message: string }) => (
    <div data-testid="error">{message}</div>
  ),
}));

vi.mock('../../utils/errorMapper', () => ({
  mapMovieError: (err: unknown) => `Mapped: ${String(err)}`,
}));

vi.mock('../../components/ui/Button', () => ({
  default: ({
    children,
    onClick,
  }: {
    children: ReactNode;
    onClick: () => void;
    className?: string;
  }) => <button onClick={onClick}>{children}</button>,
}));

const mockMovie: OmdbMovieDetails = {
  Title: 'Matrix',
  Year: '1999',
  imdbID: '1',
  Poster: 'poster.jpg',
  Genre: 'Action',
  Country: 'USA',
  imdbRating: '8.7',
  Actors: 'Keanu Reeves',
  Plot: 'Default plot',
  Response: 'True',
};

const mockedQuery = vi.mocked(useGetMovieDetailsQuery);

function mockQueryState(state: {
  data?: MovieDetailsResult | null;
  isLoading?: boolean;
  isError?: boolean;
  error?: unknown;
}) {
  mockedQuery.mockReturnValue({
    data: state.data ?? null,
    isLoading: state.isLoading ?? false,
    isError: state.isError ?? false,
    error: state.error ?? null,
    refetch: mockRefetch,
  });
}

describe('MovieDetailSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders movie details', async () => {
    mockQueryState({ data: mockMovie });

    render(
      <MemoryRouter>
        <MovieDetailSection />
      </MemoryRouter>
    );

    expect(await screen.findByText(mockMovie.Title)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.Year)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.Genre)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.Country)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.imdbRating)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.Actors)).toBeInTheDocument();
  });

  it('shows spinner when fetching and no movie yet', () => {
    mockedQuery.mockReturnValue({
      data: null,
      isFetching: true,
      isError: false,
      error: null,
      refetch: mockRefetch,
    });

    render(
      <MemoryRouter>
        <MovieDetailSection />
      </MemoryRouter>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('shows mapped error message', () => {
    mockQueryState({ isError: true, error: 'Boom' });

    render(
      <MemoryRouter>
        <MovieDetailSection />
      </MemoryRouter>
    );

    expect(screen.getByText('Mapped: Boom')).toBeInTheDocument();
  });

  it('shows movie not found when Response is False', () => {
    const errorResponse: OmdbErrorResponse = {
      Response: 'False',
      Error: 'Movie not found',
    };

    mockQueryState({ data: errorResponse });

    render(
      <MemoryRouter>
        <MovieDetailSection />
      </MemoryRouter>
    );

    expect(screen.getByText(/movie not found/i)).toBeInTheDocument();
  });

  it('calls updateParams when close button is clicked', async () => {
    mockQueryState({ data: mockMovie });

    render(
      <MemoryRouter>
        <MovieDetailSection />
      </MemoryRouter>
    );

    await screen.findByText('Matrix');

    fireEvent.click(screen.getByRole('button', { name: '✕' }));

    expect(mockUpdateParams).toHaveBeenCalledWith({ details: null });
  });

  it('does not render image if poster is N/A', async () => {
    mockQueryState({ data: { ...mockMovie, Poster: 'N/A' } });

    render(
      <MemoryRouter>
        <MovieDetailSection />
      </MemoryRouter>
    );

    await screen.findByText('Matrix');

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('does not render image if poster is empty string', async () => {
    mockQueryState({ data: { ...mockMovie, Poster: '' } });

    render(
      <MemoryRouter>
        <MovieDetailSection />
      </MemoryRouter>
    );

    await screen.findByText('Matrix');

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('calls refreshDetails (invalidateTags + refetch)', async () => {
    mockQueryState({ data: mockMovie });

    render(
      <MemoryRouter>
        <MovieDetailSection />
      </MemoryRouter>
    );

    await screen.findByText('Matrix');

    fireEvent.click(screen.getByRole('button', { name: 'Refresh' }));

    expect(movieApi.util.invalidateTags).toHaveBeenCalledWith([
      { type: 'MovieDetails' },
    ]);
    expect(mockRefetch).toHaveBeenCalled();
  });
});
