import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { MovieDetailSection } from './MovieDetailSection';
import type { OmdbMovieDetails } from '../api/types';

const mockNavigate = vi.fn();
const mockUpdateParams = vi.fn();

vi.mock('../hooks/useMovieParams', () => ({
  useMovieParams: () => ({
    search: 'Batman',
    page: 2,
    details: 'tt0111161',
    updateParams: mockUpdateParams,
  }),
}));

vi.mock('react-router', async () => {
  const actual =
    await vi.importActual<typeof import('react-router')>('react-router');

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

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

function mockFetch(data: OmdbMovieDetails | { Response: 'False' }): void {
  globalThis.fetch = vi.fn(
    async () =>
      new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
  );
}

describe('MovieDetailSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders movie details', async () => {
    mockFetch(mockMovie);

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

  it('shows movie not found when Response is False', async () => {
    mockFetch({ ...mockMovie, Response: 'False' });

    render(
      <MemoryRouter>
        <MovieDetailSection />
      </MemoryRouter>
    );

    expect(await screen.findByText(/movie not found/i)).toBeInTheDocument();
  });

  it('calls updateParams when close button is clicked', async () => {
    mockFetch(mockMovie);

    render(
      <MemoryRouter>
        <MovieDetailSection />
      </MemoryRouter>
    );

    await screen.findByText('Matrix');

    const closeButton = screen.getByRole('button', { name: '✕' });
    fireEvent.click(closeButton);

    expect(mockUpdateParams).toHaveBeenCalledWith({ details: null });
  });

  it('does not render image if poster is N/A', async () => {
    mockFetch({ ...mockMovie, Poster: 'N/A' });

    render(
      <MemoryRouter>
        <MovieDetailSection />
      </MemoryRouter>
    );

    await screen.findByText(mockMovie.Title);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('does not render image if poster is empty string', async () => {
    mockFetch({ ...mockMovie, Poster: '' });

    render(
      <MemoryRouter>
        <MovieDetailSection />
      </MemoryRouter>
    );

    await screen.findByText(mockMovie.Title);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
