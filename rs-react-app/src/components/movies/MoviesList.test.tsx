import { render, screen } from '@testing-library/react';
import MovieList from './MoviesList';
import type { OmdbMovie } from '../../api/types';

const movies: OmdbMovie[] = [
  {
    Title: 'Matrix',
    Year: '1999',
    imdbID: '1',
    Poster: '',
    Type: 'movie',
  },
  {
    Title: 'Batman',
    Year: '2005',
    imdbID: '2',
    Poster: '',
    Type: 'movie',
  },
];

describe('MovieList', () => {
  it('renders list of movies', () => {
    render(<MovieList movies={movies} />);
    expect(screen.getByText('Matrix')).toBeInTheDocument();
    expect(screen.getByText('Batman')).toBeInTheDocument();
  });
});
