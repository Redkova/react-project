import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { MovieDetailSection } from './MovieDetailSection';
import type { OmdbMovieDetails } from '../api/types';

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const actual =
    await vi.importActual<typeof import('react-router')>('react-router');

  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useSearchParams: () => [
      new URLSearchParams({
        details: 'tt0111161',
        page: '2',
      }),
    ],
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

function mockFetch(data: OmdbMovieDetails): void {
  globalThis.fetch = vi.fn(
    async (): Promise<Response> =>
      new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
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

  it('shows movie not found', async () => {
    const failedMovie: OmdbMovieDetails = {
      ...mockMovie,
      Response: 'False',
    };

    mockFetch(failedMovie);

    render(
      <MemoryRouter>
        <MovieDetailSection />
      </MemoryRouter>
    );

    expect(await screen.findByText(/movie not found/i)).toBeInTheDocument();
  });

  it('navigates back on close button click', async () => {
    mockFetch(mockMovie);

    render(
      <MemoryRouter>
        <MovieDetailSection />
      </MemoryRouter>
    );

    await screen.findByText(mockMovie.Title);

    const closeButton = screen.getByRole('button', {
      name: '✕',
    });

    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/?page=2');
  });

  it('hides image on error', async () => {
    mockFetch(mockMovie);

    render(
      <MemoryRouter>
        <MovieDetailSection />
      </MemoryRouter>
    );

    const image = await screen.findByRole('img');

    fireEvent.error(image);

    await waitFor(() => {
      expect(image).toHaveStyle({
        display: 'none',
      });
    });
  });

  it('does not render image if poster is N/A', async () => {
    const movieWithoutPoster: OmdbMovieDetails = {
      ...mockMovie,
      Poster: 'N/A',
    };

    mockFetch(movieWithoutPoster);

    render(
      <MemoryRouter>
        <MovieDetailSection />
      </MemoryRouter>
    );

    await screen.findByText(mockMovie.Title);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('does not render image if poster is empty string', async () => {
    const movieWithoutPoster: OmdbMovieDetails = {
      ...mockMovie,
      Poster: '',
    };

    mockFetch(movieWithoutPoster);

    render(
      <MemoryRouter>
        <MovieDetailSection />
      </MemoryRouter>
    );

    await screen.findByText(mockMovie.Title);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
