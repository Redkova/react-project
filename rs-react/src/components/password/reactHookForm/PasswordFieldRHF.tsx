import { type Strength } from '../../../utils/getPasswordStrength';
import { getPasswordStrength } from '../../../utils/getPasswordStrength';
import { type UseFormRegister } from 'react-hook-form';
import { type FormValuesData } from '../../../validation/validationSchema';
import { PasswordRules } from '../PasswordRules';

type Props = {
  register: UseFormRegister<FormValuesData>;
  passwordValue?: string;
};

export const PasswordFieldRHF = ({ register, passwordValue = '' }: Props) => {
  const strength: Strength = getPasswordStrength(passwordValue || '');

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

      <PasswordRules strength={strength} showRules={showRules} />
    </div>
  );
};
