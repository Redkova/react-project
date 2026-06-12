import {
  type Strength,
  getPasswordStrength,
} from '../../../utils/getPasswordStrength';
import { useState } from 'react';
import { PasswordRules } from '../PasswordRules';

type Props = {
  label: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  strength: Strength;
  setStrength: (s: Strength) => void;
};

export const PasswordFieldUncontrolled = ({
  label,
  inputRef,
  strength,
  setStrength,
}: Props) => {
  const [value, setValue] = useState('');

  const isValid =
    strength.hasUpper &&
    strength.hasLower &&
    strength.hasNumber &&
    strength.hasSpecial;

  const showRules = !isValid && value.length > 0;

  return (
    <div className='mb-4'>
      <label htmlFor='password' className='block mb-1 font-medium'>
        {label}
      </label>

      <input
        ref={inputRef}
        id='password'
        type='password'
        className='border p-2 rounded w-full'
        onChange={(e) => {
          const v = e.target.value;
          setValue(v);
          setStrength(getPasswordStrength(v));
        }}
      />
      <PasswordRules strength={strength} showRules={showRules} />
    </div>
  );
};
