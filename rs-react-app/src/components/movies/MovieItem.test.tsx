import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import MovieItem from './MovieItem';
import type { OmdbMovie } from '../../api/types';
import { useNavigate } from 'react-router';
import { useMovieParams } from '../../hooks/useMovieParams';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

vi.mock('react-router', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('../../hooks/useMovieParams', () => ({
  useMovieParams: vi.fn(),
}));

vi.mock('../../hooks/reduxHooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock('../ui/Checkbox', () => ({
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
      data-testid="checkbox"
      onClick={(e) => e.stopPropagation()}
      onChange={onChange}
    />
  ),
}));

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
  const mockNavigate = vi.fn();
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    vi.mocked(useAppSelector).mockReturnValue(false);

    vi.mocked(useMovieParams).mockReturnValue({
      search: 'Batman',
      page: 3,
      details: null,
      updateParams: vi.fn(),
    });

    mockNavigate.mockClear();
    mockDispatch.mockClear();
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

  it('does not render image when poster is N/A', () => {
    render(<MovieItem movie={movieWithoutPoster} />);
    expect(screen.queryByRole('img')).toBeNull();
    expect(screen.getByText('No image')).toBeInTheDocument();
  });

  it('navigates to details on item click', () => {
    render(<MovieItem movie={movieWithPoster} />);

    const container = screen.getByText('Matrix').closest('div')!;
    fireEvent.click(container);

    expect(mockNavigate).toHaveBeenCalledWith(
      '/?search=Batman&page=3&details=1'
    );
  });

  it('dispatches toggleMovieSelection when checkbox is clicked', () => {
    render(<MovieItem movie={movieWithPoster} />);

    const checkbox = screen.getByTestId('checkbox');
    fireEvent.click(checkbox);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  it('checkbox click does NOT trigger navigation', () => {
    render(<MovieItem movie={movieWithPoster} />);

    const checkbox = screen.getByTestId('checkbox');
    fireEvent.click(checkbox);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('shows selected checkbox when movie is selected', () => {
    vi.mocked(useAppSelector).mockReturnValue(true);

    render(<MovieItem movie={movieWithPoster} />);

    const checkbox = screen.getByTestId('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });
});
