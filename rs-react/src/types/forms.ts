export type FormValuesData = {
  name: string;
  age: string;
  email: string;
  gender: string;
  terms: boolean;
  country: string;
  password: string;
  confirmPassword: string;
  fileBase64?: string | null;
};

export type InputField =
  | {
      name: 'name' | 'age' | 'email';
      label: string;
      type: 'text' | 'number' | 'email';
    }
  | { name: 'password' | 'confirmPassword'; label: string; type: 'password' }
  | { name: 'terms'; label: string; type: 'checkbox' }
  | { name: 'gender'; label: string; type: 'select' }
  | { name: 'country'; label: string; type: 'autocomplete' }
  | { name: 'file'; label: string; type: 'file' };

export type Refs = {
  name: React.RefObject<HTMLInputElement | null>;
  age: React.RefObject<HTMLInputElement | null>;
  email: React.RefObject<HTMLInputElement | null>;
  gender: React.RefObject<HTMLSelectElement | null>;
  country: React.RefObject<HTMLInputElement | null>;
  password: React.RefObject<HTMLInputElement | null>;
  confirmPassword: React.RefObject<HTMLInputElement | null>;
  terms: React.RefObject<HTMLInputElement | null>;
};
