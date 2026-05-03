import type { OmdbSearchResponse, MoviesResult } from './types';

const API_KEY = '88101ce2';
const BASE_URL = 'https://www.omdbapi.com/';

function buildUrl(params: Record<string, string | number>): string {
  const url = new URL(BASE_URL);
  url.searchParams.set('apikey', API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  return url.toString();
}

export async function searchMovies(
  query: string,
  page: number = 1
): Promise<MoviesResult> {
  const url = buildUrl({ s: query, page });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Network error');
  }

  const data: OmdbSearchResponse = await response.json();
  if (data.Response === 'False') {
    return {
      movies: [],
      total: 0,
      error: data.Error,
    };
  }

  return {
    movies: data.Search ?? [],
    total: Number(data.totalResults ?? 0),
  };
}
