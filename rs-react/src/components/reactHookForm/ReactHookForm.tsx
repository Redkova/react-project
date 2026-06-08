import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addSubmittedForm } from '../../store/submittedFormsSlice';
import { fileToBase64 } from '../../utils/fileToBase64';
import { useState } from 'react';
import { getPasswordStrength } from '../../utils/getPasswordStrength';
import { PasswordFieldRHF } from '../password/reactHookForm/PasswordFieldRHF';
import { ConfirmPasswordRHF } from '../password/reactHookForm/ConfirmPasswordRHF';

export type RHFValues = {
  name: string;
  age: number;
  email: string;
  gender: string;
  terms: boolean;
  file: FileList;
  password: string;
  confirmPassword: string;
};

export const ReactHookForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch } = useForm<RHFValues>();
  const [fileName, setFileName] = useState<string | null>(null);

  const passwordValue = watch('password') || '';
  const confirmValue = watch('confirmPassword') || '';
  const strength = getPasswordStrength(passwordValue);

  const onSubmit = async (formValues: RHFValues) => {
    let fileBase64: string | null = null;

    const file = formValues.file?.[0];

    if (file) {
      const isValidType = ['image/png', 'image/jpeg'].includes(file.type);
      const isValidSize = file.size <= 2 * 1024 * 1024;

      if (isValidType && isValidSize) {
        fileBase64 = await fileToBase64(file);
      }
    }

    dispatch(
      addSubmittedForm({
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        formType: 'rhf',
        data: {
          ...formValues,
          fileBase64,
        },
        createdAt: new Date().toISOString(),
      })
    );
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='name'>Name</label>
      <input
        id='name'
        {...register('name')}
        className='border p-2 rounded w-full mb-4'
      />

      <label htmlFor='age'>Age</label>
      <input
        id='age'
        type='number'
        {...register('age')}
        className='border p-2 rounded w-full mb-4'
      />

      <label htmlFor='email'>Email</label>
      <input
        id='email'
        type='email'
        {...register('email')}
        className='border p-2 rounded w-full mb-4'
      />

      <label htmlFor='gender'>Gender</label>
      <select
        id='gender'
        {...register('gender')}
        className='border p-2 rounded w-full mb-4'
      >
        <option value=''>Select gender</option>
        <option value='female'>Female</option>
        <option value='male'>Male</option>
      </select>

      <div className='mb-4 flex items-center gap-2'>
        <input
          id='terms'
          type='checkbox'
          {...register('terms')}
          className='w-4 h-4 cursor-pointer'
        />
        <span>Accept Terms & Conditions</span>
      </div>

      <PasswordFieldRHF register={register} passwordValue={passwordValue} />

      <ConfirmPasswordRHF
        register={register}
        passwordValue={passwordValue}
        confirmValue={confirmValue}
      />

      <div className='mb-4'>
        <label className='block mb-1 font-medium'>Upload Image</label>

        <input
          id='file'
          type='file'
          accept='image/png, image/jpeg'
          {...register('file')}
          className='hidden'
          onChange={(e) => {
            const file = e.target.files?.[0];
            setFileName(file ? file.name : null);
          }}
        />
        <label
          htmlFor='file'
          className='inline-block bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-500'
        >
          Choose file
        </label>
        {fileName && (
          <p className='mt-2 text-sm text-gray-600'>Selected: {fileName}</p>
        )}
      </div>

      <button
        type='submit'
        className='mt-4 bg-emerald-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-emerald-500'
      >
        Submit
      </button>
    </form>
  );
};
