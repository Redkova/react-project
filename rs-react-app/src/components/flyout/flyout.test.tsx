import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { SelectedMoviesFlyout } from './flyout';
import { type OmdbMovie } from '../../api/types';

const mockDispatch = vi.fn();

vi.mock('../../hooks/reduxHooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: vi.fn(),
}));

import { useAppSelector } from '../../hooks/reduxHooks';

vi.mock('../../utils/downloadMoviesCsv', () => ({
  downloadMoviesCsv: vi.fn(),
}));

import { downloadMoviesCsv } from '../../utils/downloadMoviesCsv';

vi.mock('../ui/Button', () => ({
  default: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick: () => void;
  }) => <button onClick={onClick}>{children}</button>,
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

describe('SelectedMoviesFlyout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns null when no movies selected', () => {
    vi.mocked(useAppSelector).mockReturnValue([]);

    const { container } = render(<SelectedMoviesFlyout />);

    expect(container.firstChild).toBeNull();
  });

  it('renders flyout when movies are selected', () => {
    vi.mocked(useAppSelector).mockReturnValue(movies);

    render(<SelectedMoviesFlyout />);

    expect(screen.getByText('Selected movies:')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('dispatches unselectAllMovies when clicking Unselect all', () => {
    vi.mocked(useAppSelector).mockReturnValue(movies);

    render(<SelectedMoviesFlyout />);

    const button = screen.getByRole('button', { name: 'Unselect all' });
    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  it('calls downloadMoviesCsv with selected movies', () => {
    vi.mocked(useAppSelector).mockReturnValue(movies);

    render(<SelectedMoviesFlyout />);

    const button = screen.getByRole('button', { name: 'Download' });
    fireEvent.click(button);

    expect(downloadMoviesCsv).toHaveBeenCalledWith(movies);
  });
});
