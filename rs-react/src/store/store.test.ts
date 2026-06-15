import { describe, it, expect } from 'vitest';
import { store } from './store';
import type { RootState, AppDispatch } from './store';

describe('Redux store', () => {
  it('creates store with correct reducers', () => {
    const state = store.getState();

    expect(state).toHaveProperty('submittedForms');
    expect(state).toHaveProperty('countries');
  });

  it('has correct initial state shape', () => {
    const state: RootState = store.getState();

    expect(state.submittedForms).toHaveProperty('items');
    expect(Array.isArray(state.submittedForms.items)).toBe(true);
    expect(state.countries).toHaveProperty('list');
    expect(Array.isArray(state.countries.list)).toBe(true);
  });

  it('dispatch is correctly typed', () => {
    const dispatch: AppDispatch = store.dispatch;

    expect(typeof dispatch).toBe('function');
  });
});
