import type { OmdbMovie, OmdbMovieDetails } from '../api/types';
import { generateMovieDetailsCsv } from './moviesDetailsCsv';

import { store } from '../store/store';
import { movieApi } from '../api/api';

export async function downloadMoviesCsv(movies: OmdbMovie[]) {
  const details = await Promise.all(
    movies.map((m) =>
      store
        .dispatch(movieApi.endpoints.getMovieDetails.initiate(m.imdbID))
        .unwrap()
    )
  );

  const validMovieDetails = details.filter(
    (detail): detail is OmdbMovieDetails => detail.Response === 'True'
  );

  const moviesCsv = generateMovieDetailsCsv(validMovieDetails);

  const blob = new Blob([moviesCsv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const filename = `${movies.length}_items.csv`;
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
