import { Component } from 'react';
import type { OmdbMovie } from '../../api/types';
import MovieItem from './MovieItem';

interface Props {
  movies: OmdbMovie[];
}

class MovieList extends Component<Props> {
  render() {
    return (
      <div className="space-y-4">
        {this.props.movies.map((m) => (
          <MovieItem key={m.imdbID} movie={m} />
        ))}
      </div>
    );
  }
}

export default MovieList;
