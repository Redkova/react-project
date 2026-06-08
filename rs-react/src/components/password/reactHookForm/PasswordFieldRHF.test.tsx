import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PasswordFieldRHF } from './PasswordFieldRHF';
import { useForm } from 'react-hook-form';
import type { FormValues } from '../../../validation/validationSchema';
import { getPasswordStrength } from '../../../utils/getPasswordStrength';

vi.mock('../../../utils/getPasswordStrength');

describe('PasswordFieldRHF', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function setup(passwordValue: string) {
    const Wrapper = () => {
      const { register } = useForm<FormValues>();

      return (
        <PasswordFieldRHF register={register} passwordValue={passwordValue} />
      );
    };

    return render(<Wrapper />);
  }

  it('does NOT show rules when password is empty', () => {
    vi.mocked(getPasswordStrength).mockReturnValue({
      hasUpper: false,
      hasLower: false,
      hasNumber: false,
      hasSpecial: false,
    });

    setup('');

    expect(
      screen.queryByText('• Password must contain at least 1 uppercase letter')
    ).not.toBeInTheDocument();
  });

  it('shows rules when password is weak', () => {
    vi.mocked(getPasswordStrength).mockReturnValue({
      hasUpper: false,
      hasLower: true,
      hasNumber: false,
      hasSpecial: false,
    });

    setup('abc');

    expect(
      screen.getByText('• Password must contain at least 1 uppercase letter')
    ).toBeInTheDocument();
  });

  it('applies correct colors based on strength', () => {
    vi.mocked(getPasswordStrength).mockReturnValue({
      hasUpper: true,
      hasLower: false,
      hasNumber: true,
      hasSpecial: false,
    });

    setup('Ab1');

    expect(
      screen.getByText('• Password must contain at least 1 uppercase letter')
    ).toHaveClass('text-green-600');

    expect(
      screen.getByText('• Password must contain at least 1 lowercase letter')
    ).toHaveClass('text-red-600');
  });

  it('hides rules when password is fully valid', () => {
    vi.mocked(getPasswordStrength).mockReturnValue({
      hasUpper: true,
      hasLower: true,
      hasNumber: true,
      hasSpecial: true,
    });

    setup('Aa1!');
    expect(
      screen.queryByText('• Password must contain at least 1 uppercase letter')
    ).not.toBeInTheDocument();
  });
});
