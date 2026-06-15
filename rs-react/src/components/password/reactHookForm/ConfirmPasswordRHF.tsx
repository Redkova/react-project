import { type FieldRendererProps } from '../../reactHookForm/FormFieldRenderRHF';

export const ConfirmPasswordRHF = ({
  register,
  watch,
  errors,
}: FieldRendererProps) => {
  const passwordValue = watch('password') ?? '';
  const confirmValue = watch('confirmPassword') ?? '';

  const match = confirmValue.length > 0 && confirmValue === passwordValue;

  return (
    <div className='mb-4'>
      <label>Confirm Password</label>

      <input
        type='password'
        {...register('confirmPassword')}
        className='border p-2 rounded w-full'
      />

      {!match && confirmValue.length > 0 && (
        <p className='text-red-600 text-sm'>Passwords do not match</p>
      )}

      {errors.confirmPassword && (
        <p className='text-red-600 text-sm'>{errors.confirmPassword.message}</p>
      )}
    </div>
  );
};
