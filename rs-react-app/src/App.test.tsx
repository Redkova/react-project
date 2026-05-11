import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from './App';
import type { ComponentProps } from 'react';
import MainLayout from './components/layout/Layout';
import MovieContainer from './components/movies/MovieContainer';

type LayoutProps = ComponentProps<typeof MainLayout>;
type MovieProps = ComponentProps<typeof MovieContainer>;

vi.mock('./components/layout/Layout', () => ({
  default: ({ children }: LayoutProps) => (
    <div data-testid="layout">{children}</div>
  ),
}));

vi.mock('./components/movies/MovieContainer', () => ({
  default: (_props: MovieProps) => <div data-testid="movie-container" />,
}));

describe('App', () => {
  it('renders MainLayout', () => {
    render(<App />);

    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });

  it('renders MovieContainer inside MainLayout', () => {
    render(<App />);

    const layout = screen.getByTestId('layout');
    const movieContainer = screen.getByTestId('movie-container');

    expect(layout).toContainElement(movieContainer);
  });
});
