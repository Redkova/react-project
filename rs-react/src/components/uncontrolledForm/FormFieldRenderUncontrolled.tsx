import { type InputField } from '../../types/forms';
import { type Refs } from '../../types/forms';
import { uncontrolledFieldComponents } from './uncontrolledFieldComponents';

type StrengthState = {
  hasUpper: boolean;
  hasLower: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
};

export type UncontrolledFieldRendererProps = {
  field: InputField;
  refs: Refs;
  errors: Record<string, string>;
  countries: string[];
  countryValue: string;
  setCountryValue: (v: string) => void;
  strength: StrengthState;
  setStrength: React.Dispatch<React.SetStateAction<StrengthState>>;
  fileRef: React.RefObject<HTMLInputElement | null>;
  fileName: string | null;
  setFileName: (v: string | null) => void;
};

export const FormFieldRendererUncontrolled = (
  props: UncontrolledFieldRendererProps
) => {
  const { field } = props;

  const type =
    field.name === 'confirmPassword' ? 'confirmPassword' : field.type;

  const Component = uncontrolledFieldComponents[type];
  return <Component {...props} />;
};
