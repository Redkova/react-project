import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { AboutPage } from '../AboutPage';

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

describe('AboutPage', () => {
  it('renders main description text', () => {
    render(<AboutPage />);

    expect(
      screen.getByText(/This application was developed by/i)
    ).toBeInTheDocument();
  });

  it('renders RS School link', () => {
    render(<AboutPage />);

    const rs = screen.getByRole('link', { name: 'RS School' });

    expect(rs).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
  });

  it('renders GitHub link', () => {
    render(<AboutPage />);

    const github = screen.getByRole('link', { name: 'GitHub' });
    expect(github).toHaveAttribute('href', 'https://github.com/Redkova');
  });

  it('renders Back to main link', () => {
    render(<AboutPage />);

    const back = screen.getByRole('link', { name: 'Back to main' });
    expect(back).toHaveAttribute('href', '/');
  });
});
