import { describe, it, expect } from 'vitest';
import { mapMovieError } from '../errorMapper';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { OmdbErrorResponse } from '../../api/types';

describe('mapMovieError', () => {
  it('returns "Unknown error occurred" when error is undefined', () => {
    expect(mapMovieError(undefined)).toBe('Unknown error occurred');
  });

  it('returns network error message for FETCH_ERROR', () => {
    const error: FetchBaseQueryError = {
      status: 'FETCH_ERROR',
      error: 'Network request failed',
    };
    expect(mapMovieError(error)).toBe(
      'Network error. Please check your connection.'
    );
  });

  it('returns parsing error message for PARSING_ERROR', () => {
    const error: FetchBaseQueryError = {
      status: 'PARSING_ERROR',
      originalStatus: 200,
      data: 'Invalid JSON',
      error: 'Parse error',
    };
    expect(mapMovieError(error)).toBe('Server returned invalid data');
  });

  it('handles OMDb error: Too many results', () => {
    const data: OmdbErrorResponse = {
      Response: 'False',
      Error: 'Too many results.',
    };
    const error: FetchBaseQueryError = { status: 400, data };

    expect(mapMovieError(error)).toBe(
      'Too many results. Try a more specific title.'
    );
  });

  it('handles OMDb error: Movie not found', () => {
    const data: OmdbErrorResponse = {
      Response: 'False',
      Error: 'Movie not found!',
    };
    const error: FetchBaseQueryError = { status: 404, data };

    expect(mapMovieError(error)).toBe('No movies found with that title.');
  });

  it('handles OMDb error: Invalid API key', () => {
    const data: OmdbErrorResponse = {
      Response: 'False',
      Error: 'Invalid API key!',
    };
    const error: FetchBaseQueryError = { status: 401, data };

    expect(mapMovieError(error)).toBe('Invalid API key.');
  });

  it('handles OMDb error: Request limit reached', () => {
    const data: OmdbErrorResponse = {
      Response: 'False',
      Error: 'Request limit reached!',
    };
    const error: FetchBaseQueryError = { status: 429, data };

    expect(mapMovieError(error)).toBe(
      'Request limit reached. Try again later.'
    );
  });

  it('returns server error for 500+', () => {
    const error: FetchBaseQueryError = {
      status: 500,
      data: {},
    };
    expect(mapMovieError(error)).toBe('Server error. Please try again later.');
  });

  it('returns invalid API key for 401', () => {
    const error: FetchBaseQueryError = { status: 401, data: {} };
    expect(mapMovieError(error)).toBe('Invalid API key.');
  });

  it('returns movie not found for 404', () => {
    const error: FetchBaseQueryError = { status: 404, data: {} };
    expect(mapMovieError(error)).toBe('Movie not found.');
  });

  it('returns fallback message for unknown error', () => {
    const error: FetchBaseQueryError = {
      status: 400,
      data: {},
    };
    expect(mapMovieError(error)).toBe(
      'Something went wrong. Please try again.'
    );
  });
});
