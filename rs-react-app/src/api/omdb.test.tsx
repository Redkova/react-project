import { vi } from 'vitest';
import { searchMovies, fetchMovieDetails } from './omdb';
import type {
  OmdbMovieSearchResponse,
  OmdbMovieDetails,
  OmdbErrorResponse,
} from './types';

function mockFetch(data: unknown, ok: boolean = true, status: number = 200) {
  return vi.spyOn(globalThis, 'fetch').mockResolvedValue({
    ok,
    status,
    json: async () => data,
  } as Response);
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('searchMovies API', () => {
  it('returns movies and total on successful response', async () => {
    mockFetch({
      Response: 'True',
      Search: [
        {
          Title: 'Matrix',
          Year: '1999',
          imdbID: '1',
          Poster: '',
          Type: 'movie',
        },
      ],
      totalResults: '1',
    } satisfies OmdbMovieSearchResponse);

    const result = await searchMovies('Matrix', 1);

    expect(result.movies).toHaveLength(1);
    expect(result.total).toBe(1);
    expect(result.error).toBeUndefined();
  });

  it('throws error on HTTP error', async () => {
    mockFetch({ Response: 'False' }, false, 500);

    await expect(searchMovies('Matrix', 1)).rejects.toThrow('HTTP error: 500');
  });

  it('returns error message when API Response is false', async () => {
    mockFetch({
      Response: 'False',
      Error: 'Movie not found!',
    } satisfies OmdbMovieSearchResponse);

    const result = await searchMovies('Unknown', 1);

    expect(result.movies).toEqual([]);
    expect(result.total).toBe(0);
    expect(result.error).toBe('Movie not found!');
  });

  it('returns empty movies array when Search is missing', async () => {
    mockFetch({
      Response: 'True',
      Search: undefined,
      totalResults: '0',
    } satisfies OmdbMovieSearchResponse);

    const result = await searchMovies('Test', 1);

    expect(result.movies).toEqual([]);
    expect(result.total).toBe(0);
  });

  it('calls fetch with correct URL params', async () => {
    const fetchMock = mockFetch({ Response: 'False' });

    await searchMovies('Batman', 2);

    const url = fetchMock.mock.calls[0][0] as string;

    expect(url).toContain('s=Batman');
    expect(url).toContain('page=2');
    expect(url).toContain('apikey=88101ce2');
  });
});

describe('fetchMovieDetails', () => {
  const movie: OmdbMovieDetails = {
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

  it('returns movie details on success', async () => {
    mockFetch(movie);

    const result = await fetchMovieDetails('tt1234567');

    expect(result).not.toBeNull();
    expect(result?.Title).toBe('Matrix');
  });

  it('returns null when API Response is False', async () => {
    mockFetch({
      Response: 'False',
      Error: 'Movie not found',
    } satisfies OmdbErrorResponse);

    const result = await fetchMovieDetails('tt0000000');

    expect(result).toBeNull();
  });

  it('calls fetch with correct URL params', async () => {
    const fetchMock = mockFetch(movie);

    await fetchMovieDetails('tt7654321');

    const url = fetchMock.mock.calls[0][0] as string;

    expect(url).toContain('i=tt7654321');
    expect(url).toContain('plot=short');
    expect(url).toContain('apikey=88101ce2');
  });
});
