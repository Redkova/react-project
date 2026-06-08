import { describe, it, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

vi.mock('./pages/HomePage', () => ({
  HomePage: () => <div data-testid='home-page'>HomePage</div>,
}));

describe('App', () => {
  it('renders HomePage inside Provider', () => {
    render(<App />);

    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });
});
