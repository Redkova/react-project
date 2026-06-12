import { type UseFormRegister } from 'react-hook-form';
import type { FormValuesData } from '../../../validation/validationSchema';

type Props = {
  register: UseFormRegister<FormValuesData>;
  passwordValue: string;
  confirmValue: string;
};

export const ConfirmPasswordRHF = ({ register }: Props) => {
  return (
    <div className='mb-4'>
      <label>Confirm Password</label>
      <input
        type='password'
        {...register('confirmPassword')}
        className='border p-2 rounded w-full'
      />
    </div>
  );
};
