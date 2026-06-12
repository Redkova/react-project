import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';

vi.mock('../router/AppRouter', () => ({
  AppRouter: () => <div data-testid="app-router" />,
}));

describe('App', () => {
  it('renders AppRouter', () => {
    render(<App />);
    expect(screen.getByTestId('app-router')).toBeInTheDocument();
  });
});
