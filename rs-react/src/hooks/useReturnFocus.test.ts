import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useReturnFocus } from './useReturnFocus';

describe('useReturnFocus', () => {
  let ref: React.RefObject<HTMLElement>;

  beforeEach(() => {
    ref = { current: document.createElement('button') };
    vi.spyOn(ref.current, 'focus');
  });

  it('returns focus when isOpen changes from true to false', () => {
    const { rerender } = renderHook(
      ({ isOpen }) => useReturnFocus(isOpen, ref),
      { initialProps: { isOpen: true } }
    );

    expect(ref.current?.focus).not.toHaveBeenCalled();

    rerender({ isOpen: false });

    expect(ref.current?.focus).toHaveBeenCalledTimes(1);
  });

  it('does not return focus when isOpen stays true', () => {
    const { rerender } = renderHook(
      ({ isOpen }) => useReturnFocus(isOpen, ref),
      { initialProps: { isOpen: true } }
    );

    rerender({ isOpen: true });

    expect(ref.current?.focus).not.toHaveBeenCalled();
  });

  it('does nothing if ref is undefined', () => {
    const undefinedRef = { current: null };

    const { rerender } = renderHook(
      ({ isOpen }) => useReturnFocus(isOpen, undefinedRef),
      { initialProps: { isOpen: true } }
    );

    rerender({ isOpen: false });

    expect(true).toBe(true);
  });
});
