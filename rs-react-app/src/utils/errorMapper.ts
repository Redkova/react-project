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
    return 'Errors.Unknown';
  }

  if (error instanceof Error) {
    return 'Errors.Unknown';
  }

  if (typeof error === 'string') {
    return error;
  }

  if (isFetchBaseQueryError(error)) {
    if (error.status === 'FETCH_ERROR') {
      return 'Errors.Network';
    }
    if (error.status === 'PARSING_ERROR') {
      return 'Errors.InvalidData';
    }

    if (isOmdbErrorResponse(error.data)) {
      const msg = error.data.Error;

      if (msg === 'Too many results.') {
        return 'Errors.TooManyResults';
      }
      if (msg === 'Movie not found!') {
        return 'Errors.MovieNotFound';
      }
      if (msg === 'Invalid API key!') {
        return 'Errors.InvalidApiKey';
      }
      if (msg === 'Request limit reached!') {
        return 'Errors.LimitReached';
      }

      return msg;
    }

    if (typeof error.status === 'number') {
      if (error.status >= 500) {
        return 'Errors.ServerError';
      }
      if (error.status === 401) {
        return 'Errors.InvalidApiKey';
      }
      if (error.status === 404) {
        return 'Errors.MovieNotFound';
      }
    }
  }

  return 'Errors.SomethingWrong';
}
