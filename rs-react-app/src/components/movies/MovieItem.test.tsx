import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { useSearchParams } from 'react-router';
import MovieItem from './MovieItem';
import type { OmdbMovie } from '../../api/types';

vi.mock('react-router', async () => {
  const actual =
    await vi.importActual<typeof import('react-router')>('react-router');

  return {
    ...actual,
    useSearchParams: vi.fn(),
    Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
      <a href={to}>{children}</a>
    ),
  };
});

const mockedUseSearchParams = vi.mocked(useSearchParams);

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
  beforeEach(() => {
    mockedUseSearchParams.mockReturnValue([
      new URLSearchParams({ page: '3' }),
      vi.fn(),
    ]);
  });

  it('renders movie title and year', () => {
    render(<MovieItem movie={movieWithPoster} />);
    expect(screen.getByText('Matrix')).toBeInTheDocument();
    expect(screen.getByText('1999')).toBeInTheDocument();
  });

  it('renders poster image when poster exists', () => {
    render(<MovieItem movie={movieWithPoster} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('sets correct image src and alt attributes', () => {
    render(<MovieItem movie={movieWithPoster} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'poster.jpg');
    expect(image).toHaveAttribute('alt', 'Matrix');
  });

  it('does not render image when poster is N/A', () => {
    render(<MovieItem movie={movieWithoutPoster} />);
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('does not render image when poster is empty string', () => {
    render(<MovieItem movie={{ ...movieWithoutPoster, Poster: '' }} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('hides image on load error', () => {
    render(<MovieItem movie={movieWithPoster} />);

    const image = screen.getByRole('img') as HTMLImageElement;

    fireEvent.error(image);

    expect(image.style.display).toBe('none');
  });

  it('creates correct link with page param and imdbID', () => {
    render(<MovieItem movie={movieWithPoster} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/?page=3&details=1');
  });

  it('defaults page to 1 when no page param exists', () => {
    mockedUseSearchParams.mockReturnValue([new URLSearchParams(), vi.fn()]);

    render(<MovieItem movie={movieWithPoster} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/?page=1&details=1');
  });
});
