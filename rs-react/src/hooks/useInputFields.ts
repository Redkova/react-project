import { useRef } from 'react';

type TextField = {
  name: 'name' | 'age' | 'email' | 'country' | 'password' | 'confirmPassword';
  label: string;
  type: 'text' | 'number' | 'email' | 'password';
};

type CheckboxField = {
  name: 'terms';
  label: string;
  type: 'checkbox';
};

type SelectField = {
  name: 'gender';
  label: string;
  type: 'select';
};

export type InputField = TextField | CheckboxField | SelectField;

type Refs = {
  name: React.RefObject<HTMLInputElement>;
  age: React.RefObject<HTMLInputElement>;
  email: React.RefObject<HTMLInputElement>;
  gender: React.RefObject<HTMLSelectElement>;
  country: React.RefObject<HTMLInputElement>;
  password: React.RefObject<HTMLInputElement>;
  confirmPassword: React.RefObject<HTMLInputElement>;
  terms: React.RefObject<HTMLInputElement>;
};

export const useInputFields = () => {
  const inputFields: InputField[] = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'age', label: 'Age', type: 'number' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'gender', label: 'Gender', type: 'select' },
    { name: 'country', label: 'Country', type: 'text' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
    { name: 'terms', label: 'Accept Terms & Conditions', type: 'checkbox' },
  ];

  const refs: Refs = {
    name: useRef(null),
    age: useRef(null),
    email: useRef(null),
    gender: useRef(null),
    country: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null),
    terms: useRef(null),
  };

  const fileRef = useRef<HTMLInputElement>(null);

  return { inputFields, refs, fileRef };
};
