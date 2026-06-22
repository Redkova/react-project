import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  OmdbMovieSearchResponse,
  OmdbMovieDetails,
  OmdbErrorResponse,
} from './types';

const cacheTTL = Number(process.env.NEXT_PUBLIC_CACHE_TTL ?? 60);

export const movieApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_OMDB_API_URL,
  }),
  keepUnusedDataFor: cacheTTL,
  tagTypes: ['Movies', 'MovieDetails'],
  endpoints: (builder) => ({
    searchMovies: builder.query<
      OmdbMovieSearchResponse,
      { query: string; page: number }
    >({
      query: ({ query, page }) => ({
        url: '',
        params: {
          apikey: process.env.NEXT_PUBLIC_OMDB_API_KEY,
          s: query,
          page,
        },
      }),
      providesTags: () => [{ type: 'Movies', id: 'LIST' }],
    }),
    getMovieDetails: builder.query<
      OmdbMovieDetails | OmdbErrorResponse,
      string
    >({
      query: (id) => ({
        url: '',
        params: {
          apikey: process.env.NEXT_PUBLIC_OMDB_API_KEY,
          i: id,
          plot: 'short',
        },
      }),
      providesTags: (_, __, id) => [{ type: 'MovieDetails', id }],
    }),
  }),
});

export const { useSearchMoviesQuery, useGetMovieDetailsQuery } = movieApi;
