import { TextFieldRHF } from './fields/TextFieldRHF';
import { CheckboxFieldRHF } from './fields/CheckboxFieldRHF';
import { SelectFieldRHF } from './fields/SelectFieldRHF';
import { FileFieldRHF } from './fields/FileFieldRHF';
import { AutocompleteFieldRHF } from './fields/AutocompleteFieldRHF';
import { PasswordFieldRHF } from '../password/reactHookForm/PasswordFieldRHF';
import { ConfirmPasswordRHF } from '../password/reactHookForm/ConfirmPasswordRHF';

export const fieldComponents = {
  text: TextFieldRHF,
  number: TextFieldRHF,
  email: TextFieldRHF,
  checkbox: CheckboxFieldRHF,
  select: SelectFieldRHF,
  file: FileFieldRHF,
  autocomplete: AutocompleteFieldRHF,
  password: PasswordFieldRHF,
  confirmPassword: ConfirmPasswordRHF,
} as const;
