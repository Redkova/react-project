import { render, screen } from '@testing-library/react';
import MovieItem from './MovieItem';
import type { OmdbMovie } from '../../api/types';

const movieWithPoster: OmdbMovie = {
  Title: 'Matrix',
  Year: '1999',
  imdbID: '1',
  Poster: 'poster.jpg',
  Type: 'movie',
};

const movieWithoutPoster: OmdbMovie = {
  Title: 'Batman',
  Year: '2005',
  imdbID: '2',
  Poster: 'N/A',
  Type: 'movie',
};

describe('MovieItem', () => {
  it('renders movie title and year', () => {
    render(<MovieItem movie={movieWithPoster} />);
    expect(screen.getByText('Matrix')).toBeInTheDocument();
    expect(screen.getByText('1999')).toBeInTheDocument();
  });

  it('renders poster image when poster exists', () => {
    render(<MovieItem movie={movieWithPoster} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('does not render image when poster is N/A', () => {
    render(<MovieItem movie={movieWithoutPoster} />);
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('does not render image when poster is empty string', () => {
    render(<MovieItem movie={{ ...movieWithoutPoster, Poster: '' }} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
