import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useInputFields } from './useInputFields';

describe('useInputFields', () => {
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
