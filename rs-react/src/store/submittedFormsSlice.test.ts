import { describe, it, expect } from 'vitest';
import reducer, {
  addSubmittedForm,
  markAsOld,
  type SubmittedForm,
} from './submittedFormsSlice';

describe('submittedFormsSlice', () => {
  const initialState = { items: [] };

  const sampleForm: SubmittedForm = {
    id: '123',
    formType: 'RHF',
    data: {
      name: 'John',
      age: '25',
      email: 'john@example.com',
      gender: 'male',
      terms: true,
      country: 'Sweden',
      password: '123456',
      confirmPassword: '123456',
      fileBase64: null,
    },
    createdAt: '2024-01-01',
  };

  it('returns initial state', () => {
    const state = reducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({ items: [] });
  });

  it('adds a submitted form and sets isNew to true', () => {
    const state = reducer(initialState, addSubmittedForm(sampleForm));

    expect(state.items).toHaveLength(1);

    expect(state.items[0]).toEqual({
      ...sampleForm,
      isNew: true,
    });
  });

  it('marks a form as old', () => {
    const stateWithItem = reducer(initialState, addSubmittedForm(sampleForm));

    const updated = reducer(stateWithItem, markAsOld('123'));

    expect(updated.items[0].isNew).toBe(false);
  });

  it('does nothing if markAsOld receives unknown id', () => {
    const stateWithItem = reducer(initialState, addSubmittedForm(sampleForm));

    const updated = reducer(stateWithItem, markAsOld('unknown'));
    expect(updated.items[0].isNew).toBe(true);
  });

  it('does not mutate previous state', () => {
    const state1 = reducer(initialState, addSubmittedForm(sampleForm));
    const state2 = reducer(state1, markAsOld('123'));

    expect(state1).not.toBe(state2);
    expect(state1.items).not.toBe(state2.items);
  });
});
