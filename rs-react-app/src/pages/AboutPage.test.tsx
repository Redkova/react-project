import { render, screen } from '@testing-library/react';
import { AboutPage } from './AboutPage';

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

  it('renders both links inside the bottom section', () => {
    render(<AboutPage />);

    const github = screen.getByRole('link', { name: 'GitHub' });
    const rs = screen.getByRole('link', { name: 'RS School' });

    const container = github.parentElement;
    expect(container).toContainElement(github);
    expect(container).toContainElement(rs);
  });
});
