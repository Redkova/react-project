import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PasswordFieldUncontrolled } from './PasswordFieldUncontrolled';
import { getPasswordStrength } from '../../../utils/getPasswordStrength';
import type { Strength } from '../../../utils/getPasswordStrength';
import React from 'react';

vi.mock('../../../utils/getPasswordStrength');

describe('PasswordFieldUncontrolled', () => {
  const inputRef = React.createRef<HTMLInputElement>();
  const setStrength = vi.fn();

  const weakStrength: Strength = {
    hasUpper: false,
    hasLower: true,
    hasNumber: false,
    hasSpecial: false,
  };

  const strongStrength: Strength = {
    hasUpper: true,
    hasLower: true,
    hasNumber: true,
    hasSpecial: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders label and password input', () => {
    vi.mocked(getPasswordStrength).mockReturnValue(weakStrength);

    render(
      <PasswordFieldUncontrolled
        label='Password'
        inputRef={inputRef}
        strength={weakStrength}
        setStrength={setStrength}
      />
    );

    expect(screen.getByText('Password')).toBeInTheDocument();

    const input = screen.getByLabelText('Password', { selector: 'input' });
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'password');
  });

  it('calls setStrength with calculated strength on input change', () => {
    vi.mocked(getPasswordStrength).mockReturnValue(weakStrength);

    render(
      <PasswordFieldUncontrolled
        label='Password'
        inputRef={inputRef}
        strength={weakStrength}
        setStrength={setStrength}
      />
    );

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'abc' },
    });

    expect(getPasswordStrength).toHaveBeenCalledWith('abc');
    expect(setStrength).toHaveBeenCalledWith(weakStrength);
  });

  it('shows rules when password is weak', () => {
    vi.mocked(getPasswordStrength).mockReturnValue(weakStrength);

    render(
      <PasswordFieldUncontrolled
        label='Password'
        inputRef={inputRef}
        strength={weakStrength}
        setStrength={setStrength}
      />
    );

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'abc' },
    });

    expect(
      screen.getByText('• Password must contain at least 1 uppercase letter')
    ).toBeInTheDocument();

    expect(
      screen.getByText('• Password must contain at least 1 lowercase letter')
    ).toBeInTheDocument();

    expect(
      screen.getByText('• Password must contain at least 1 number')
    ).toBeInTheDocument();

    expect(
      screen.getByText('• Password must contain at least 1 special character')
    ).toBeInTheDocument();
  });

  it('applies correct color classes based on strength', () => {
    vi.mocked(getPasswordStrength).mockReturnValue(weakStrength);

    render(
      <PasswordFieldUncontrolled
        label='Password'
        inputRef={inputRef}
        strength={weakStrength}
        setStrength={setStrength}
      />
    );

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'abc' },
    });

    expect(
      screen.getByText('• Password must contain at least 1 uppercase letter')
    ).toHaveClass('text-red-600');

    expect(
      screen.getByText('• Password must contain at least 1 lowercase letter')
    ).toHaveClass('text-green-600');

    expect(
      screen.getByText('• Password must contain at least 1 number')
    ).toHaveClass('text-red-600');

    expect(
      screen.getByText('• Password must contain at least 1 special character')
    ).toHaveClass('text-red-600');
  });

  it('hides rules when password is fully valid', () => {
    vi.mocked(getPasswordStrength).mockReturnValue(strongStrength);

    render(
      <PasswordFieldUncontrolled
        label='Password'
        inputRef={inputRef}
        strength={strongStrength}
        setStrength={setStrength}
      />
    );

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'Aa1!' },
    });

    expect(
      screen.queryByText('• Password must contain at least 1 uppercase letter')
    ).not.toBeInTheDocument();
  });
});
