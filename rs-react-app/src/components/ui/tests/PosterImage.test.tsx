import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PosterImage } from '../PosterImage';

describe('PosterImage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders "No image" when src is null', () => {
    render(<PosterImage src={null} alt="poster" />);

    expect(screen.getByText('No image')).toBeInTheDocument();
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('renders "No image" when src is "N/A"', () => {
    render(<PosterImage src="N/A" alt="poster" />);

    expect(screen.getByText('No image')).toBeInTheDocument();
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('renders "No image" when src is empty string', () => {
    render(<PosterImage src="" alt="poster" />);

    expect(screen.getByText('No image')).toBeInTheDocument();
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('shows spinner initially when image is loading', () => {
    render(<PosterImage src="poster.jpg" alt="poster" />);

    const spinner = document.querySelector('.animate-spin');
    expect(spinner).not.toBeNull();

    const img = screen.getByRole('img');
    expect(img).toHaveClass('opacity-0');
  });

  it('shows "No image" when image fails to load', () => {
    render(<PosterImage src="poster.jpg" alt="poster" />);

    const img = screen.getByRole('img');

    fireEvent.error(img);

    expect(screen.getByText('No image')).toBeInTheDocument();
  });

  it('applies custom className to wrapper', () => {
    const { container } = render(
      <PosterImage src={null} alt="poster" className="custom-class" />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });
});
