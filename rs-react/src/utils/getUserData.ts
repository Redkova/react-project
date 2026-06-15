import { type InputField } from '../types/forms';
import { type FormValuesData } from '../types/forms';
import { type Refs } from '../types/forms';

export const getUserData = (
  refs: Refs,
  inputFields: InputField[]
): FormValuesData => {
  const data: FormValuesData = {
    name: '',
    age: '',
    email: '',
    gender: '',
    terms: false,
    country: '',
    password: '',
    confirmPassword: '',
    fileBase64: null,
  };

  inputFields.forEach((field) => {
    if (field.name === 'file') return;

    switch (field.name) {
      case 'name':
        data.name = refs.name.current?.value ?? '';
        break;

      case 'age':
        data.age = refs.age.current?.value ?? '';
        break;

      case 'email':
        data.email = refs.email.current?.value ?? '';
        break;

      case 'gender':
        data.gender = refs.gender.current?.value ?? '';
        break;

      case 'country':
        data.country = refs.country.current?.value ?? '';
        break;

      case 'password':
        data.password = refs.password.current?.value ?? '';
        break;

      case 'confirmPassword':
        data.confirmPassword = refs.confirmPassword.current?.value ?? '';
        break;

      case 'terms':
        data.terms = refs.terms.current?.checked ?? false;
        break;
    }
  });

  return data;
};
