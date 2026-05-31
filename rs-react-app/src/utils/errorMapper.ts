import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { OmdbErrorResponse } from '../api/types';

export function mapMovieError(error: unknown): string {
  if (!error) {
    return 'Unknown error occurred';
  }
  const fetchError = error as FetchBaseQueryError;

  if (fetchError.status === 'FETCH_ERROR') {
    return 'Network error. Please check your connection.';
  }

  if (fetchError.status === 'PARSING_ERROR') {
    return 'Server returned invalid data';
  }

  const data = fetchError.data as OmdbErrorResponse | undefined;

  if (data?.Error) {
    if (data.Error === 'Too many results.') {
      return 'Too many results. Try a more specific title.';
    }
    if (data.Error === 'Movie not found!') {
      return 'No movies found with that title.';
    }
    if (data.Error === 'Invalid API key!') {
      return 'Invalid API key.';
    }
    if (data.Error === 'Request limit reached!') {
      return 'Request limit reached. Try again later.';
    }
    return data.Error;
  }

  if (typeof fetchError?.status === 'number') {
    if (fetchError.status >= 500) {
      return 'Server error. Please try again later.';
    }
    if (fetchError.status === 401) {
      return 'Invalid API key.';
    }
    if (fetchError.status === 404) {
      return 'Movie not found.';
    }
  }

  return 'Something went wrong. Please try again.';
}
