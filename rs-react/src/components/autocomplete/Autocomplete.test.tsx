import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Autocomplete } from './Autocomplete';
import { useState } from 'react';

const Wrapper = () => {
  const [value, setValue] = useState('');
  return (
    <Autocomplete
      label='Country'
      value={value}
      onChange={setValue}
      suggestions={['Sweden', 'Switzerland', 'Norway']}
    />
  );
};

describe('Autocomplete', () => {
  const suggestions = ['Sweden', 'Switzerland', 'Norway', 'Finland'];

  it('renders label and input', () => {
    render(
      <Autocomplete
        label='Country'
        value=''
        onChange={() => {}}
        suggestions={suggestions}
      />
    );

    expect(screen.getByText('Country')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('calls onChange when typing', () => {
    const onChange = vi.fn();

    render(
      <Autocomplete
        label='Country'
        value=''
        onChange={onChange}
        suggestions={suggestions}
      />
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Swe' },
    });

    expect(onChange).toHaveBeenCalledWith('Swe');
  });

  it('selects suggestion and closes list', () => {
    render(<Wrapper />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 's' },
    });

    const option = screen.getByText('Sweden');
    fireEvent.click(option);

    expect(screen.getByRole('textbox')).toHaveValue('Sweden');

    expect(screen.queryByText('Switzerland')).not.toBeInTheDocument();
  });

  it('does not show list when no matches', () => {
    const onChange = vi.fn();

    render(
      <Autocomplete
        label='Country'
        value='zzz'
        onChange={onChange}
        suggestions={suggestions}
      />
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'zzz' },
    });

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
