import { render, screen } from '@testing-library/react';
import MovieError from '../MoviesError';

describe('MovieError', () => {
  it('renders error message correctly', () => {
    render(<MovieError message="Something went wrong" />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});
