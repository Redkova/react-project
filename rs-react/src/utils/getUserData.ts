import { type InputField } from '../hooks/useInputFields';

type Refs = {
  name: React.RefObject<HTMLInputElement>;
  age: React.RefObject<HTMLInputElement>;
  email: React.RefObject<HTMLInputElement>;
  terms: React.RefObject<HTMLInputElement>;
  gender: React.RefObject<HTMLSelectElement>;
};

export const getUserData = (refs: Refs, fields: InputField[]) => {
  const result: Record<string, unknown> = {};

  fields.forEach((field) => {
    const ref = refs[field.name];
    const element = ref.current;
    if (!element) return;

    if (field.type === 'checkbox' && element instanceof HTMLInputElement) {
      result[field.name] = element.checked;
    } else {
      result[field.name] = (
        element as HTMLInputElement | HTMLSelectElement
      ).value;
    }
  });

  return result;
};
