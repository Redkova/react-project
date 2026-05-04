export function mapMovieError(error?: string): string | null {
  if (!error) return null;

  if (error === 'Too many results.' || error === 'Movie not found!') {
    return 'No movies found with that title!';
  }

  return error;
}
