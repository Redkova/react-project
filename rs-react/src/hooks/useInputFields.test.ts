import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useInputFields } from './useInputFields';

describe('useInputFields', () => {
  it('returns all input fields in correct order', () => {
    const { result } = renderHook(() => useInputFields());

    const { inputFields } = result.current;

    expect(inputFields).toHaveLength(8);

    expect(inputFields[0]).toEqual({
      name: 'name',
      label: 'Name',
      type: 'text',
    });

    expect(inputFields[1]).toEqual({
      name: 'age',
      label: 'Age',
      type: 'number',
    });

    expect(inputFields[2]).toEqual({
      name: 'email',
      label: 'Email',
      type: 'email',
    });

    expect(inputFields[3]).toEqual({
      name: 'gender',
      label: 'Gender',
      type: 'select',
    });

    expect(inputFields[4]).toEqual({
      name: 'country',
      label: 'Country',
      type: 'text',
    });

    expect(inputFields[5]).toEqual({
      name: 'password',
      label: 'Password',
      type: 'password',
    });

    expect(inputFields[6]).toEqual({
      name: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
    });

    expect(inputFields[7]).toEqual({
      name: 'terms',
      label: 'Accept Terms & Conditions',
      type: 'checkbox',
    });
  });

  it('returns refs for all fields', () => {
    const { result } = renderHook(() => useInputFields());

    const { refs } = result.current;

    expect(refs.name.current).toBe(null);
    expect(refs.age.current).toBe(null);
    expect(refs.email.current).toBe(null);
    expect(refs.gender.current).toBe(null);
    expect(refs.country.current).toBe(null);
    expect(refs.password.current).toBe(null);
    expect(refs.confirmPassword.current).toBe(null);
    expect(refs.terms.current).toBe(null);
  });

  it('returns fileRef as a valid ref object', () => {
    const { result } = renderHook(() => useInputFields());

    const { fileRef } = result.current;

    expect(fileRef.current).toBe(null);
  });
});
