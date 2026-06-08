import { type UseFormRegister } from 'react-hook-form';
import { type RHFValues } from '../../reactHookForm/ReactHookForm';

type Props = {
  register: UseFormRegister<RHFValues>;
  passwordValue: string;
  confirmValue: string;
};

export const ConfirmPasswordRHF = ({
  register,
  passwordValue,
  confirmValue,
}: Props) => {
  const match = confirmValue.length > 0 && confirmValue === passwordValue;

  return (
    <div className='mb-4'>
      <label>Confirm Password</label>
      <input
        type='password'
        {...register('confirmPassword')}
        className='border p-2 rounded w-full'
      />

      {confirmValue.length > 0 && !match && (
        <p className='text-red-600 text-sm mt-1'>Passwords do not match</p>
      )}
    </div>
  );
};
