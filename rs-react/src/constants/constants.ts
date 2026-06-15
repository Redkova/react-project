import { type InputField } from '../types/forms';

export const formFields: InputField[] = [
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'age', label: 'Age', type: 'number' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'gender', label: 'Gender', type: 'select' },
  { name: 'country', label: 'Country', type: 'autocomplete' },
  { name: 'password', label: 'Password', type: 'password' },
  { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
  { name: 'terms', label: 'Accept Terms', type: 'checkbox' },
  { name: 'file', label: 'Upload Image', type: 'file' },
];
