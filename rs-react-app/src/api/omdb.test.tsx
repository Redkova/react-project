import { vi } from 'vitest';
import { searchMovies } from './omdb';
import type { OmdbMovieSearchResponse } from './types';

describe('searchMovies API', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockFetchResponse = (
    data: OmdbMovieSearchResponse,
    ok = true,
    status = 200
  ) =>
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok,
      status,
      json: () => Promise.resolve(data),
    } as Partial<Response> as Response);

  it('returns movies and total on successful response', async () => {
    mockFetchResponse({
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
    });

    const result = await searchMovies('Matrix', 1);

    expect(result.movies).toHaveLength(1);
    expect(result.total).toBe(1);
  });

  it('throws error on HTTP error', async () => {
    mockFetchResponse({ Response: 'False' }, false, 500);

    await expect(searchMovies('Matrix', 1)).rejects.toThrow('HTTP error: 500');
  });

  it('returns error message when API Response is false', async () => {
    mockFetchResponse({
      Response: 'False',
      Error: 'Movie not found!',
    });

    const result = await searchMovies('Unknown', 1);

    expect(result.movies).toEqual([]);
    expect(result.total).toBe(0);
    expect(result.error).toBe('Movie not found!');
  });

  it('returns empty movies array when Search is missing', async () => {
    mockFetchResponse({
      Response: 'True',
      Search: undefined,
      totalResults: '0',
    });

    const result = await searchMovies('Test', 1);

    expect(result.movies).toEqual([]);
    expect(result.total).toBe(0);
  });

  it('calls fetch with correct URL params', async () => {
    const fetchMock = mockFetchResponse({ Response: 'False' });

    await searchMovies('Batman', 2);

    const url = fetchMock.mock.calls[0][0] as string;

    expect(url).toContain('s=Batman');
    expect(url).toContain('page=2');
  });
});
