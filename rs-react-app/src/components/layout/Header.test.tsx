import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Header from './Header';

const toggleThemeMock = vi.fn();

vi.mock('../../context/useTheme', () => ({
  useTheme: () => ({
    theme: 'light',
    toggleTheme: toggleThemeMock,
  }),
}));

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
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the header with correct title', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    expect(screen.getByText('Find Your Movie')).toBeInTheDocument();
  });

  it('renders About link', () => {
    render(<Header />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toHaveAttribute('href', '/about');
  });

  it('calls toggleTheme when theme button is clicked', () => {
    render(<Header />);

    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });
});
