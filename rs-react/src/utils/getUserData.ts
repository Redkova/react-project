import { type InputField } from '../hooks/useInputFields';

type Refs = {
  name: React.RefObject<HTMLInputElement>;
  age: React.RefObject<HTMLInputElement>;
  email: React.RefObject<HTMLInputElement>;
  terms: React.RefObject<HTMLInputElement>;
  gender: React.RefObject<HTMLSelectElement>;
  country: React.RefObject<HTMLInputElement>;
  password: React.RefObject<HTMLInputElement>;
  confirmPassword: React.RefObject<HTMLInputElement>;
};

export const getUserData = (refs: Refs, inputFields: InputField[]) => {
  const data: Record<string, unknown> = {};

  inputFields.forEach((field) => {
    if (field.type === 'checkbox') {
      data[field.name] = refs[field.name].current?.checked ?? false;
    } else if (field.type === 'select') {
      data[field.name] = refs[field.name].current?.value ?? '';
    } else {
      data[field.name] = refs[field.name].current?.value ?? '';
    }
  });

  return data;
};
