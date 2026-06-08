import { useRef } from 'react';

type TextField = {
  name: 'name' | 'age' | 'email' | 'password' | 'confirmPassword';
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
  terms: React.RefObject<HTMLInputElement>;
  gender: React.RefObject<HTMLSelectElement>;
  password: React.RefObject<HTMLInputElement>;
  confirmPassword: React.RefObject<HTMLInputElement>;
};

export const useInputFields = () => {
  const inputFields: InputField[] = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'age', label: 'Age', type: 'number' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'gender', label: 'Gender', type: 'select' },
    { name: 'terms', label: 'Accept Terms & Conditions', type: 'checkbox' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
  ];

  const refs: Refs = {
    name: useRef<HTMLInputElement>(null),
    age: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    terms: useRef<HTMLInputElement>(null),
    gender: useRef<HTMLSelectElement>(null),
    password: useRef<HTMLInputElement>(null),
    confirmPassword: useRef<HTMLInputElement>(null),
  };

  const fileRef = useRef<HTMLInputElement>(null);

  return { inputFields, refs, fileRef };
};
