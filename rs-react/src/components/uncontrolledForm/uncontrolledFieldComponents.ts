import { TextFieldUncontrolled } from './fields/TextFieldUncontrolled';
import { CheckboxFieldUncontrolled } from './fields/CheckboxFieldUncontrolled';
import { SelectFieldUncontrolled } from './fields/SelectFieldUncontrolled';
import { FileFieldUncontrolled } from './fields/FileFieldUncontrolled';
import { AutocompleteFieldUncontrolled } from './fields/AutocompleteFieldUncontrolled';
import { PasswordFieldWrapperUncontrolled } from './fields/PasswordFieldWrapperUncontrolled';
import { ConfirmPasswordWrapperUncontrolled } from './fields/ConfirmPasswordWrapperUncontrolled';

export const uncontrolledFieldComponents = {
  text: TextFieldUncontrolled,
  number: TextFieldUncontrolled,
  email: TextFieldUncontrolled,
  checkbox: CheckboxFieldUncontrolled,
  select: SelectFieldUncontrolled,
  file: FileFieldUncontrolled,
  autocomplete: AutocompleteFieldUncontrolled,
  password: PasswordFieldWrapperUncontrolled,
  confirmPassword: ConfirmPasswordWrapperUncontrolled,
} as const;
