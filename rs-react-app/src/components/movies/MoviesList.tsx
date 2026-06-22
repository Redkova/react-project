'use client';

import { ReactElement } from 'react';
import type { OmdbMovie } from '../../api/types';
import MovieItem from './MovieItem';

interface Props {
  movies: OmdbMovie[];
}

function MovieList({ movies }: Props): ReactElement {
  return (
    <div className="flex flex-col gap-2">
      {movies.map((movie) => (
        <MovieItem key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;
