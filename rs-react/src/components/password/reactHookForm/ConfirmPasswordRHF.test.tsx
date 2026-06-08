import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { ConfirmPasswordRHF } from './ConfirmPasswordRHF';
import type { UseFormRegisterReturn } from 'react-hook-form';
import type { FormValues } from '../../../validation/validationSchema';
import type { UseFormRegister } from 'react-hook-form';

describe('ConfirmPasswordRHF', () => {
  const registerMock = vi.fn(
    (name: keyof FormValues): UseFormRegisterReturn => ({
      onChange: vi.fn(),
      onBlur: vi.fn(),
      name,
      ref: vi.fn(),
    })
  );

  it('calls register with correct field name', () => {
    render(
      <ConfirmPasswordRHF
        register={registerMock as unknown as UseFormRegister<FormValues>}
        passwordValue=''
        confirmValue=''
      />
    );

    expect(registerMock).toHaveBeenCalledWith('confirmPassword');
  });
});
