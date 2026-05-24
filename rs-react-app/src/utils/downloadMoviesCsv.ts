import type { OmdbMovie } from '../api/types';

function formattedValueCsv(value: string): string {
  if (!value) return '';
  const formattedValue = value.replace(/"/g, '""');
  return /[",\n]/.test(formattedValue) ? `"${formattedValue}"` : formattedValue;
}

export function downloadMoviesCsv(movies: OmdbMovie[]) {
  const header = ['Title', 'Year', 'imdbID', 'Poster', 'DetailsURL'];

  const rows = movies.map((movie) => [
    formattedValueCsv(movie.Title),
    formattedValueCsv(movie.Year),
    formattedValueCsv(movie.imdbID),
    formattedValueCsv(movie.Poster),
    formattedValueCsv(`/?details=${movie.imdbID}`),
  ]);

  const csvContent = [header.join(','), ...rows.map((r) => r.join(','))].join(
    '\n'
  );

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
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
