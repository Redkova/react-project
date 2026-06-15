import { type InputField } from '../../types/forms';
import { type FormValuesData } from '../../validation/validationSchema';
import {
  type UseFormRegister,
  type FieldErrors,
  type UseFormWatch,
  type UseFormSetValue,
} from 'react-hook-form';
import { fieldComponents } from './fieldsComponents';

export type FieldRendererProps = {
  field: InputField;
  register: UseFormRegister<FormValuesData>;
  errors: FieldErrors<FormValuesData>;
  watch: UseFormWatch<FormValuesData>;
  setValue: UseFormSetValue<FormValuesData>;
  countries: string[];
  fileName: string | null;
  setFileName: (v: string | null) => void;
};

export const FormFieldRendererRHF = (props: FieldRendererProps) => {
  const type =
    props.field.name === 'confirmPassword'
      ? 'confirmPassword'
      : props.field.type;

  const Component = fieldComponents[type];
  return <Component {...props} />;
};
