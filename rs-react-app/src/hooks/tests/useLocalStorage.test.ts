import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useLocalStorage } from '../useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('returns initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'initial'));

    expect(result.current[0]).toBe('initial');
  });

  it('reads value from localStorage if present', () => {
    localStorage.setItem('key', JSON.stringify('stored'));

    const { result } = renderHook(() => useLocalStorage('key', 'initial'));

    expect(result.current[0]).toBe('stored');
  });

  it('writes value to localStorage when updated', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'initial'));

    act(() => {
      result.current[1]('updated');
    });

    expect(localStorage.getItem('key')).toBe(JSON.stringify('updated'));
  });

  it('updates state when setValue is called', () => {
    const { result } = renderHook(() => useLocalStorage('key', 1));

    act(() => {
      result.current[1](2);
    });

    expect(result.current[0]).toBe(2);
  });

  it('falls back to initialValue when JSON.parse throws', () => {
    localStorage.setItem('key', 'INVALID_JSON');

    const { result } = renderHook(() => useLocalStorage('key', 'fallback'));

    expect(result.current[0]).toBe('fallback');
  });
});
