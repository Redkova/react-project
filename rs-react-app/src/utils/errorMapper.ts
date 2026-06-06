import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { OmdbErrorResponse } from '../api/types';

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error !== null && 'status' in error;
}

function isOmdbErrorResponse(data: unknown): data is OmdbErrorResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'Error' in data &&
    typeof (data as { Error: unknown }).Error === 'string'
  );
}

export function mapMovieError(error: unknown): string {
  if (!error) {
    return 'Unknown error occurred';
  }

  if (error instanceof Error) {
    return error.message || 'Unknown error occurred';
  }

  if (typeof error === 'string') {
    return error;
  }

  if (isFetchBaseQueryError(error)) {
    if (error.status === 'FETCH_ERROR') {
      return 'Network error. Please check your connection.';
    }
    if (error.status === 'PARSING_ERROR') {
      return 'Server returned invalid data';
    }

    if (isOmdbErrorResponse(error.data)) {
      const msg = error.data.Error;

      if (msg === 'Too many results.') {
        return 'Too many results. Try a more specific title.';
      }
      if (msg === 'Movie not found!') {
        return 'No movies found with that title.';
      }
      if (msg === 'Invalid API key!') {
        return 'Invalid API key.';
      }
      if (msg === 'Request limit reached!') {
        return 'Request limit reached. Try again later.';
      }

      return msg;
    }

    if (typeof error.status === 'number') {
      if (error.status >= 500) {
        return 'Server error. Please try again later.';
      }
      if (error.status === 401) {
        return 'Invalid API key.';
      }
      if (error.status === 404) {
        return 'Movie not found.';
      }
    }
  }

  return 'Something went wrong. Please try again.';
}
