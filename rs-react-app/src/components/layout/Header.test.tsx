import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Header from './Header';

vi.mock('react-router', async () => {
  const actual =
    await vi.importActual<typeof import('react-router')>('react-router');

  return {
    ...actual,
    Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
      <a href={to}>{children}</a>
    ),
  };
});

describe('Header', () => {
  it('renders the header with correct title', () => {
    render(<Header />);

    const header = screen.getByRole('banner');

    expect(header).toBeInTheDocument();
    expect(screen.getByText('Find Your Movie')).toBeInTheDocument();
  });

  it('renders link to home page', () => {
    render(<Header />);

    const homeLink = screen.getByRole('link', { name: /find your movie/i });
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders About link', () => {
    render(<Header />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toHaveAttribute('href', '/about');
  });
});
