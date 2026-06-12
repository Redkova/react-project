import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from '../Checkbox';

describe('Checkbox', () => {
  it('renders as a checkbox input', () => {
    render(<Checkbox checked={false} onChange={() => {}} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('reflects the checked prop', () => {
    render(<Checkbox checked={true} onChange={() => {}} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('calls onChange when toggled', () => {
    const handleChange = vi.fn();

    render(<Checkbox checked={false} onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('stops click propagation', () => {
    const handleChange = vi.fn();
    const stopPropagation = vi.fn();

    render(<Checkbox checked={false} onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox, { stopPropagation });

    const clickEvent = new MouseEvent('click', { bubbles: true });
    const spy = vi.spyOn(clickEvent, 'stopPropagation');

    checkbox.dispatchEvent(clickEvent);

    expect(spy).toHaveBeenCalled();
  });
});
