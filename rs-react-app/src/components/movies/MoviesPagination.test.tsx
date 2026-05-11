import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import MoviesPagination from './MoviesPagination';

describe('MoviesPagination', () => {
  it('renders page number', () => {
    render(<MoviesPagination page={3} onNext={() => {}} onPrev={() => {}} />);
    expect(screen.getByText('Page 3')).toBeInTheDocument();
  });

  it('calls onPrev when Prev clicked', async () => {
    const user = userEvent.setup();
    const onPrev = vi.fn();

    render(<MoviesPagination page={1} onNext={() => {}} onPrev={onPrev} />);
    await user.click(screen.getByRole('button', { name: 'Prev' }));
    expect(onPrev).toHaveBeenCalled();
  });

  it('calls onNext when Next clicked', async () => {
    const user = userEvent.setup();
    const onNext = vi.fn();

    render(<MoviesPagination page={1} onNext={onNext} onPrev={() => {}} />);
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(onNext).toHaveBeenCalled();
  });
});
