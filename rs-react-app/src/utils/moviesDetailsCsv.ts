import type { OmdbMovieDetails } from '../api/types';

function formattedValueCsv(value: string): string {
  if (!value) return '';
  const formattedValue = value.replace(/"/g, '""');
  return /[",\n]/.test(formattedValue) ? `"${formattedValue}"` : formattedValue;
}

export function generateMovieDetailsCsv(movies: OmdbMovieDetails[]): string {
  const header = [
    'Title',
    'Year',
    'Genre',
    'Country',
    'Actors',
    'imdbRating',
    'Poster',
    'DetailsURL',
  ];

  const rows = movies.map((movie) => [
    formattedValueCsv(movie.Title),
    formattedValueCsv(movie.Year),
    formattedValueCsv(movie.Genre),
    formattedValueCsv(movie.Country),
    formattedValueCsv(movie.Actors),
    formattedValueCsv(movie.imdbRating),
    formattedValueCsv(movie.Poster),
    formattedValueCsv(`/?details=${movie.imdbID}`),
  ]);

  return [header.join(','), ...rows.map((r) => r.join(','))].join('\n');
}
