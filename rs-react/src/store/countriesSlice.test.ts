import { describe, it, expect } from 'vitest';
import reducer, { selectCountries, type Country } from './countriesSlice';
import { countries } from '../data/countries';

describe('countriesSlice', () => {
  const initialState = {
    list: countries,
  };

  it('returns initial state', () => {
    const state = reducer(undefined, { type: '@@INIT' });

    expect(state).toEqual({
      list: countries,
    });
  });

  it('initial state contains correct list of countries', () => {
    const state = reducer(undefined, { type: '@@INIT' });

    expect(Array.isArray(state.list)).toBe(true);
    expect(state.list.length).toBe(countries.length);
    expect(state.list[0]).toBe(countries[0]);
  });

  it('selectCountries returns list from state', () => {
    const mockState = {
      countries: {
        list: ['Sweden', 'Norway', 'Finland'] as Country[],
      },
    };

    const result = selectCountries(mockState);

    expect(result).toEqual(['Sweden', 'Norway', 'Finland']);
  });

  it('reducer does not modify state for unknown actions', () => {
    const state = reducer(initialState, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual(initialState);
  });
});
