import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMovieParams } from '../useMovieParams';
import { useSearchParams } from 'react-router';

vi.mock('react-router', () => ({
  useSearchParams: vi.fn(),
}));

describe('useMovieParams', () => {
  const mockSetParams = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  function mockParams(initial: Record<string, string | null>) {
    const searchParams = new URLSearchParams();

    Object.entries(initial).forEach(([key, value]) => {
      if (value !== null) searchParams.set(key, value);
    });

    vi.mocked(useSearchParams).mockReturnValue([searchParams, mockSetParams]);
  }

  it('returns default values when params are empty', () => {
    mockParams({});

    const { result } = renderHook(() => useMovieParams());

    expect(result.current.search).toBe('');
    expect(result.current.page).toBe(1);
    expect(result.current.details).toBeNull();
  });

  it('reads search, page and details from URL params', () => {
    mockParams({
      search: 'Matrix',
      page: '3',
      details: 'tt123',
    });

    const { result } = renderHook(() => useMovieParams());

    expect(result.current.search).toBe('Matrix');
    expect(result.current.page).toBe(3);
    expect(result.current.details).toBe('tt123');
  });

  it('updateParams sets new values', () => {
    mockParams({ search: 'Matrix', page: '1' });

    const { result } = renderHook(() => useMovieParams());

    act(() => {
      result.current.updateParams({ page: '2', details: 'tt999' });
    });

    const updated = mockSetParams.mock.calls[0][0];
    expect(updated.get('page')).toBe('2');
    expect(updated.get('details')).toBe('tt999');
  });

  it('updateParams removes params when value is null', () => {
    mockParams({ search: 'Matrix', page: '1', details: 'tt123' });

    const { result } = renderHook(() => useMovieParams());

    act(() => {
      result.current.updateParams({ details: null });
    });

    const updated = mockSetParams.mock.calls[0][0];
    expect(updated.get('details')).toBeNull();
  });

  it('updateParams preserves existing params not included in update', () => {
    mockParams({ search: 'Matrix', page: '1' });

    const { result } = renderHook(() => useMovieParams());

    act(() => {
      result.current.updateParams({ search: 'Batman' });
    });

    const updated = mockSetParams.mock.calls[0][0];
    expect(updated.get('search')).toBe('Batman');
    expect(updated.get('page')).toBe('1');
  });
});
