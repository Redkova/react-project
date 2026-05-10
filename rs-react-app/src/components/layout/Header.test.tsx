import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders the header with correct title', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(screen.getByText('Find Your Movie')).toBeInTheDocument();
  });
});
