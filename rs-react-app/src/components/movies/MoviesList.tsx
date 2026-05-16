import type { OmdbMovie } from '../../api/types';
import MovieItem from './MovieItem';

interface Props {
  movies: OmdbMovie[];
}

function MovieList({ movies }: Props) {
  return (
    <div className="space-y-4">
      {movies.map((movie) => (
        <MovieItem key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;
