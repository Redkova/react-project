import { describe, it, expect } from 'vitest';
import { getUserData } from './getUserData';
import type { InputField } from '../hooks/useInputFields';

describe('getUserData', () => {
  const createRefs = () => ({
    name: { current: document.createElement('input') },
    age: { current: document.createElement('input') },
    email: { current: document.createElement('input') },
    gender: { current: document.createElement('select') },
    country: { current: document.createElement('input') },
    password: { current: document.createElement('input') },
    confirmPassword: { current: document.createElement('input') },
    terms: { current: document.createElement('input') },
  });

  const inputFields: InputField[] = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'age', label: 'Age', type: 'number' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'gender', label: 'Gender', type: 'select' },
    { name: 'country', label: 'Country', type: 'text' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
    { name: 'terms', label: 'Terms', type: 'checkbox' },
  ];

  it('collects values from all input fields', () => {
    const refs = createRefs();
    const option = document.createElement('option');
    option.value = 'male';
    option.textContent = 'Male';
    refs.gender.current!.appendChild(option);

    refs.name.current!.value = 'John';
    refs.age.current!.value = '25';
    refs.email.current!.value = 'john@mail.com';
    refs.gender.current!.value = 'male';
    refs.country.current!.value = 'Sweden';
    refs.password.current!.value = 'Aa1!';
    refs.confirmPassword.current!.value = 'Aa1!';
    refs.terms.current!.checked = true;

    const data = getUserData(refs, inputFields);

    expect(data).toEqual({
      name: 'John',
      age: '25',
      email: 'john@mail.com',
      gender: 'male',
      country: 'Sweden',
      password: 'Aa1!',
      confirmPassword: 'Aa1!',
      terms: true,
    });
  });

  it('returns default values when refs are null', () => {
    const refs = {
      name: { current: null },
      age: { current: null },
      email: { current: null },
      gender: { current: null },
      country: { current: null },
      password: { current: null },
      confirmPassword: { current: null },
      terms: { current: null },
    };

    const data = getUserData(refs, inputFields);

    expect(data).toEqual({
      name: '',
      age: '',
      email: '',
      gender: '',
      country: '',
      password: '',
      confirmPassword: '',
      terms: false,
    });
  });

  it('handles checkbox correctly when unchecked', () => {
    const refs = createRefs();
    refs.terms.current!.checked = false;

    const data = getUserData(refs, inputFields);

    expect(data.terms).toBe(false);
  });

  it('handles select correctly when empty', () => {
    const refs = createRefs();
    refs.gender.current!.value = '';

    const data = getUserData(refs, inputFields);

    expect(data.gender).toBe('');
  });
});
