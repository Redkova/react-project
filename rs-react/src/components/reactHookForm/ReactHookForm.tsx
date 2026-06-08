import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addSubmittedForm } from '../../store/submittedFormsSlice';
import { fileToBase64 } from '../../utils/fileToBase64';
import { useState } from 'react';
import { PasswordFieldRHF } from '../password/reactHookForm/PasswordFieldRHF';
import { ConfirmPasswordRHF } from '../password/reactHookForm/ConfirmPasswordRHF';
import { Autocomplete } from '../autocomplete/Autocomplete';
import { selectCountries } from '../../store/countriesSlice';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, type FormValues } from '../../validation/validationSchema';

export const ReactHookForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const [fileName, setFileName] = useState<string | null>(null);

  const passwordValue = watch('password') || '';
  const confirmValue = watch('confirmPassword') || '';
  const countryValue = watch('country') || '';

  const fileRegister = register('file');

  const onSubmit = async (formValues: FormValues) => {
    const file = formValues.file?.[0];

    const fileBase64 = await fileToBase64(file);

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='max-h-[80vh] overflow-y-auto p-4'
    >
      <label htmlFor='name'>Name</label>
      <input
        id='name'
        {...register('name')}
        className='border p-2 rounded w-full mb-2'
      />
      {errors.name && (
        <p className='text-red-600 text-sm'>{errors.name.message}</p>
      )}

      <label htmlFor='age'>Age</label>
      <input
        id='age'
        type='number'
        {...register('age')}
        className='border p-2 rounded w-full mb-2'
      />
      {errors.age && (
        <p className='text-red-600 text-sm'>{errors.age.message}</p>
      )}

      <label htmlFor='email'>Email</label>
      <input
        id='email'
        type='email'
        {...register('email')}
        className='border p-2 rounded w-full mb-2'
      />
      {errors.email && (
        <p className='text-red-600 text-sm'>{errors.email.message}</p>
      )}

      <label htmlFor='gender'>Gender</label>
      <select
        id='gender'
        {...register('gender')}
        className='border p-2 rounded w-full mb-2'
      >
        <option value=''>Select gender</option>
        <option value='female'>Female</option>
        <option value='male'>Male</option>
      </select>
      {errors.gender && (
        <p className='text-red-600 text-sm'>{errors.gender.message}</p>
      )}

      <Autocomplete
        label='Country'
        value={countryValue}
        onChange={(v) => {
          setValue('country', v, { shouldValidate: true });
        }}
        suggestions={countries}
      />
      {errors.country && (
        <p className='text-red-600 text-sm'>{errors.country.message}</p>
      )}

      <PasswordFieldRHF register={register} passwordValue={passwordValue} />
      {errors.password && (
        <p className='text-red-600 text-sm'>{errors.password.message}</p>
      )}

      <ConfirmPasswordRHF
        register={register}
        passwordValue={passwordValue}
        confirmValue={confirmValue}
      />
      {errors.confirmPassword && (
        <p className='text-red-600 text-sm'>{errors.confirmPassword.message}</p>
      )}

      <div className='mb-2 flex items-center gap-2'>
        <input
          id='terms'
          type='checkbox'
          {...register('terms')}
          className='w-4 h-4 cursor-pointer'
        />
        <span>Accept Terms & Conditions</span>
      </div>
      {errors.terms && (
        <p className='text-red-600 text-sm'>{errors.terms.message}</p>
      )}

      <div className='mb-2'>
        <label className='block mb-1 font-medium'>Upload Image</label>

        <input
          id='file'
          type='file'
          accept='image/png, image/jpeg'
          className='hidden'
          {...fileRegister}
          onChange={(e) => {
            fileRegister.onChange(e);

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
        <p className='mt-2 text-sm text-gray-600'>
          {fileName ? `Selected: ${fileName}` : 'No file chosen'}
        </p>
        {errors.file && (
          <p className='text-red-600 text-sm'>{errors.file.message}</p>
        )}
      </div>

      <div className='flex justify-center'>
        <button
          type='submit'
          disabled={!isValid}
          className={`mt-4 bg-emerald-600 text-white px-4 py-2 rounded ${
            isValid ? 'hover:bg-emerald-500' : 'cursor-not-allowed bg-gray-400'
          }`}
        >
          Submit
        </button>
      </div>
    </form>
  );
};
