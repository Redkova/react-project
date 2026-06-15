import { type Strength } from '../../../utils/getPasswordStrength';
import { getPasswordStrength } from '../../../utils/getPasswordStrength';
import { PasswordRules } from '../PasswordRules';
import { usePasswordValidation } from '../../../hooks/usePasswordValidation';
import { type FieldRendererProps } from '../../reactHookForm/FormFieldRenderRHF';

export const PasswordFieldRHF = ({
  register,
  watch,
  errors,
}: FieldRendererProps) => {
  const passwordValue = watch('password') ?? '';
  const strength: Strength = getPasswordStrength(passwordValue);
  const { showRules } = usePasswordValidation(strength, passwordValue);

  return (
    <div className='mb-4'>
      <label>Password</label>
      <input
        type='password'
        {...register('password')}
        className='border p-2 rounded w-full mb-2'
      />

      <PasswordRules strength={strength} showRules={showRules} />
      {errors.password && (
        <p className='text-red-600 text-sm'>{errors.password.message}</p>
      )}
    </div>
  );
};
