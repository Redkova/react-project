import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { NotFoundPage } from '../NotFoundPage';

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

describe('NotFoundPage', () => {
  it('renders title', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('Oops! Page not found')).toBeInTheDocument();
  });

  it('renders link back to main page', () => {
    render(<NotFoundPage />);

    const link = screen.getByRole('link', { name: 'Back to main' });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('renders container with correct structure', () => {
    render(<NotFoundPage />);

    const container = screen.getByText('Oops! Page not found').parentElement;

    expect(container).toBeInTheDocument();
    expect(container?.className).toContain('text-center');
  });
});
