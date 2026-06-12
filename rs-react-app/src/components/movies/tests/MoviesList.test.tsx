import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import MovieList from '../MoviesList';
import type { OmdbMovie } from '../../../api/types';

vi.mock('react-router', () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock('../../../hooks/useMovieParams', () => ({
  useMovieParams: () => ({
    search: 'Batman',
    page: 1,
    details: null,
    updateParams: vi.fn(),
  }),
}));

vi.mock('../../../hooks/reduxHooks', () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: () => false,
}));

vi.mock('../../ui/Checkbox', () => ({
  Checkbox: ({
    checked,
    onChange,
  }: {
    checked: boolean;
    onChange: () => void;
  }) => (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      data-testid="checkbox"
    />
  ),
}));

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

  it('renders correct number of MovieItem components', () => {
    render(<MovieList movies={movies} />);

    const titles = screen.getAllByRole('heading', { level: 3 });
    expect(titles).toHaveLength(2);
  });
});
