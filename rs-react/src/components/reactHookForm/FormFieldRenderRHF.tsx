import { Autocomplete } from '../autocomplete/Autocomplete';
import { PasswordFieldRHF } from '../password/reactHookForm/PasswordFieldRHF';
import { ConfirmPasswordRHF } from '../password/reactHookForm/ConfirmPasswordRHF';
import { type InputField } from '../../types/forms';
import { type FormValuesData } from '../../validation/validationSchema';
import {
  type UseFormRegister,
  type FieldErrors,
  type UseFormWatch,
  type UseFormSetValue,
} from 'react-hook-form';

type Props = {
  field: InputField;
  register: UseFormRegister<FormValuesData>;
  errors: FieldErrors<FormValuesData>;
  watch: UseFormWatch<FormValuesData>;
  setValue: UseFormSetValue<FormValuesData>;
  countries: string[];
  fileName: string | null;
  setFileName: (v: string | null) => void;
};

export const FormFieldRendererRHF = ({
  field,
  register,
  errors,
  watch,
  setValue,
  countries,
  fileName,
  setFileName,
}: Props) => {
  switch (field.type) {
    case 'autocomplete':
      return (
        <div className='mb-2'>
          <Autocomplete
            label={field.label}
            value={watch('country') ?? ''}
            onChange={(v: string) => {
              setValue('country', v, { shouldValidate: true });
            }}
            suggestions={countries}
          />
          {errors.country && (
            <p className='text-red-600 text-sm'>{errors.country.message}</p>
          )}
        </div>
      );

    case 'password':
      if (field.name === 'password') {
        return (
          <div className='mb-2'>
            <PasswordFieldRHF
              register={register}
              passwordValue={watch('password')}
            />
            {errors.password && (
              <p className='text-red-600 text-sm'>{errors.password.message}</p>
            )}
          </div>
        );
      }

      if (field.name === 'confirmPassword') {
        return (
          <div className='mb-2'>
            <ConfirmPasswordRHF
              register={register}
              passwordValue={watch('password')}
              confirmValue={watch('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className='text-red-600 text-sm'>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        );
      }

      return null;

    case 'checkbox':
      return (
        <div className='mb-2 flex items-center gap-2'>
          <input
            id={field.name}
            type='checkbox'
            {...register(field.name)}
            className='w-4 h-4 cursor-pointer'
          />
          <span>{field.label}</span>
          {errors[field.name] && (
            <p className='text-red-600 text-sm'>
              {errors[field.name]?.message}
            </p>
          )}
        </div>
      );

    case 'select':
      return (
        <div className='mb-2'>
          <label>{field.label}</label>
          <select {...register('gender')} className='border p-2 rounded w-full'>
            <option value=''>Select gender</option>
            <option value='female'>Female</option>
            <option value='male'>Male</option>
          </select>
          {errors.gender && (
            <p className='text-red-600 text-sm'>{errors.gender.message}</p>
          )}
        </div>
      );

    case 'file':
      const fileRegister = register('file');

      return (
        <div className='mb-2'>
          <label className='block mb-1 font-medium'>{field.label}</label>

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
      );

    default:
      return (
        <div className='mb-2'>
          <label>{field.label}</label>
          <input
            {...register(field.name)}
            type={field.type}
            className='border p-2 rounded w-full'
          />
          {errors[field.name] && (
            <p className='text-red-600 text-sm'>
              {errors[field.name]?.message}
            </p>
          )}
        </div>
      );
  }
};
