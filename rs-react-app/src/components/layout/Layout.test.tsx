import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import MainLayout from './Layout';
import type { ComponentProps } from 'react';
import Header from './Header';
import Footer from './Footer';

type HeaderProps = ComponentProps<typeof Header>;
type FooterProps = ComponentProps<typeof Footer>;

vi.mock('./Header', () => ({
  default: (_props: HeaderProps) => <div data-testid="header-mock" />,
}));

vi.mock('./Footer', () => ({
  default: (_props: FooterProps) => <div data-testid="footer-mock" />,
}));

describe('MainLayout', () => {
  it('renders Header, children and Footer', () => {
    render(
      <MainLayout>
        <div data-testid="child">Main content</div>
      </MainLayout>
    );
    expect(screen.getByTestId('header-mock')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toHaveTextContent('Main content');
    expect(screen.getByTestId('footer-mock')).toBeInTheDocument();
  });
});
