import { vi, type Mock } from 'vitest';
import { fetchMovies } from './movieService';
import { searchMovies } from '../omdb';
import { mapMovieError } from '../../utils/errorMapper';
import type { MoviesResult } from '../types';

vi.mock('../omdb');
vi.mock('../../utils/errorMapper');

describe('fetchMovies', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns transformed error when API returns error', async () => {
    const mockData: MoviesResult = {
      movies: [],
      total: 0,
      error: 'Movie not found',
    };

    (searchMovies as Mock).mockResolvedValue(mockData);
    (mapMovieError as Mock).mockReturnValue('Mapped error');

    const result = await fetchMovies('Unknown', 1);

    expect(searchMovies).toHaveBeenCalledWith('Unknown', 1);
    expect(mapMovieError).toHaveBeenCalledWith('Movie not found');

    expect(result).toEqual({
      movies: [],
      error: 'Mapped error',
    });
  });
});
