import { searchMovies } from '../omdb';
import { mapMovieError } from '../../utils/errorMapper';

export async function fetchMovies(query: string, page: number) {
  const data = await searchMovies(query, page);

  return {
    movies: data.movies,
    error: mapMovieError(data.error),
  };
}
