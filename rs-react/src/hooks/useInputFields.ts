import { useRef } from 'react';
import { type Refs } from '../types/forms';

export const useInputFields = () => {
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

  const fileRef = useRef<HTMLInputElement | null>(null);

  return { refs, fileRef };
};
