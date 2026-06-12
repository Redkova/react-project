import { type Strength } from '../../../utils/getPasswordStrength';
import { getPasswordStrength } from '../../../utils/getPasswordStrength';
import { type UseFormRegister } from 'react-hook-form';
import { type FormValuesData } from '../../../validation/validationSchema';

type Props = {
  register: UseFormRegister<FormValuesData>;
  passwordValue: string;
};

export const PasswordFieldRHF = ({ register, passwordValue }: Props) => {
  const strength: Strength = getPasswordStrength(passwordValue);

  const isValid =
    strength.hasUpper &&
    strength.hasLower &&
    strength.hasNumber &&
    strength.hasSpecial;

  const showRules = !isValid && passwordValue.length > 0;

  return (
    <div className='mb-4'>
      <label>Password</label>
      <input
        type='password'
        {...register('password')}
        className='border p-2 rounded w-full mb-2'
      />

      {showRules && (
        <div className='text-sm mt-1 space-y-1 mb-4'>
          <p className={strength.hasUpper ? 'text-green-600' : 'text-red-600'}>
            • Password must contain at least 1 uppercase letter
          </p>
          <p className={strength.hasLower ? 'text-green-600' : 'text-red-600'}>
            • Password must contain at least 1 lowercase letter
          </p>
          <p className={strength.hasNumber ? 'text-green-600' : 'text-red-600'}>
            • Password must contain at least 1 number
          </p>
          <p
            className={strength.hasSpecial ? 'text-green-600' : 'text-red-600'}
          >
            • Password must contain at least 1 special character
          </p>
        </div>
      )}
    </div>
  );
};
