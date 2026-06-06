import { render, screen } from '@testing-library/react';
import { MemoryRouter, Outlet } from 'react-router';
import { vi } from 'vitest';
import { AppRouter } from './AppRouter';
import type { ComponentProps } from 'react';
import MainLayout from '../components/layout/Layout';

type LayoutProps = ComponentProps<typeof MainLayout>;

vi.mock('../components/layout/Layout', () => ({
  default: ({ children }: LayoutProps) => (
    <div data-testid="layout">{children}</div>
  ),
}));

vi.mock('../pages/Main', () => ({
  default: () => (
    <div data-testid="movie-container">
      <Outlet />
    </div>
  ),
}));

vi.mock('../pages/MovieDetailSection', () => ({
  MovieDetailSection: () => <div data-testid="detail" />,
}));

vi.mock('../pages/AboutPage', () => ({
  AboutPage: () => <div data-testid="about" />,
}));

vi.mock('../pages/NotFoundPage', () => ({
  NotFoundPage: () => <div data-testid="not-found" />,
}));

describe('AppRouter', () => {
  it('renders movies on root route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByTestId('layout')).toBeInTheDocument();
    expect(screen.getByTestId('movie-container')).toBeInTheDocument();
  });

  it('renders movie details on index route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByTestId('detail')).toBeInTheDocument();
  });

  it('renders AboutPage on /about', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByTestId('about')).toBeInTheDocument();
  });
  it('renders NotFoundPage on /404', () => {
    render(
      <MemoryRouter initialEntries={['/404']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });

  it('redirects unknown routes to /404', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });
});
