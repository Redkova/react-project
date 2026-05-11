import { mapMovieError } from './errorMapper';

describe('mapMovieError', () => {
  it('returns null when error is undefined', () => {
    expect(mapMovieError(undefined)).toBeNull();
  });

  it('returns null when error is empty string', () => {
    expect(mapMovieError('')).toBeNull();
  });

  it('shows readable error message when API returns "Too many results."', () => {
    expect(mapMovieError('Too many results.')).toBe(
      'No movies found with that title!'
    );
  });

  it('shows readable error message when API returns "Movie not found!"', () => {
    expect(mapMovieError('Movie not found!')).toBe(
      'No movies found with that title!'
    );
  });

  it('returns original error for other messages', () => {
    expect(mapMovieError('Network error')).toBe('Network error');
  });
});
