import { type InputField } from '../hooks/useInputFields';
import { type FormValuesData } from '../types/forms';

type Refs = {
  name: React.RefObject<HTMLInputElement | null>;
  age: React.RefObject<HTMLInputElement | null>;
  email: React.RefObject<HTMLInputElement | null>;
  terms: React.RefObject<HTMLInputElement | null>;
  gender: React.RefObject<HTMLSelectElement | null>;
  country: React.RefObject<HTMLInputElement | null>;
  password: React.RefObject<HTMLInputElement | null>;
  confirmPassword: React.RefObject<HTMLInputElement | null>;
};

export const getUserData = (
  refs: Refs,
  inputFields: InputField[]
): FormValuesData => {
  const data = {} as FormValuesData;

  inputFields.forEach((field) => {
    if (field.type === 'checkbox') {
      data[field.name] = refs[field.name].current?.checked ?? false;
    } else {
      data[field.name] = refs[field.name].current?.value ?? '';
    }
  });

  return data;
};
