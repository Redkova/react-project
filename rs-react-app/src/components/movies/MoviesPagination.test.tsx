import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import MoviesPagination from './MoviesPagination';

describe('MoviesPagination', () => {
  it('renders page number', () => {
    render(
      <MoviesPagination
        page={3}
        onNext={() => {}}
        onPrev={() => {}}
        isFirstPage={false}
        isLastPage={false}
      />
    );

    expect(screen.getByText('Page 3')).toBeInTheDocument();
  });

  it('calls onPrev when Prev clicked', async () => {
    const user = userEvent.setup();
    const onPrev = vi.fn();

    render(
      <MoviesPagination
        page={1}
        onNext={() => {}}
        onPrev={onPrev}
        isFirstPage={false}
        isLastPage={false}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Prev' }));
    expect(onPrev).toHaveBeenCalled();
  });

  it('calls onNext when Next clicked', async () => {
    const user = userEvent.setup();
    const onNext = vi.fn();

    render(
      <MoviesPagination
        page={1}
        onNext={onNext}
        onPrev={() => {}}
        isFirstPage={false}
        isLastPage={false}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(onNext).toHaveBeenCalled();
  });

  it('applies disabled styles to Prev button on first page', () => {
    render(
      <MoviesPagination
        page={1}
        onNext={() => {}}
        onPrev={() => {}}
        isFirstPage={true}
        isLastPage={false}
      />
    );

    const prev = screen.getByRole('button', { name: 'Prev' });

    expect(prev).toHaveClass('cursor-not-allowed');
    expect(prev).toHaveClass('text-gray-500');
  });

  it('applies disabled styles to Next button on last page', () => {
    render(
      <MoviesPagination
        page={5}
        onNext={() => {}}
        onPrev={() => {}}
        isFirstPage={false}
        isLastPage={true}
      />
    );

    const next = screen.getByRole('button', { name: 'Next' });

    expect(next).toHaveClass('cursor-not-allowed');
    expect(next).toHaveClass('text-gray-500');
  });
});
