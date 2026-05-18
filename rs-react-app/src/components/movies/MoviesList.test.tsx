import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import MovieList from './MoviesList';
import type { OmdbMovie } from '../../api/types';
import { useSearchParams } from 'react-router';

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
  beforeEach(() => {
    mockedUseSearchParams.mockReturnValue([
      new URLSearchParams({ page: '1' }),
      vi.fn(),
    ]);
  });

  it('renders list of movies', () => {
    render(<MovieList movies={movies} />);

    expect(screen.getByText('Matrix')).toBeInTheDocument();
    expect(screen.getByText('Batman')).toBeInTheDocument();
  });

  it('renders correct number of MovieItem components', () => {
    render(<MovieList movies={movies} />);

    const items = screen.getAllByRole('link');
    expect(items).toHaveLength(2);
  });
});
