import { useDispatch, useSelector } from 'react-redux';
import { addSubmittedForm } from '../../store/submittedFormsSlice';
import { useInputFields } from '../../hooks/useInputFields';
import { getUserData } from '../../utils/getUserData';
import { fileToBase64 } from '../../utils/fileToBase64';
import { useState } from 'react';
import { PasswordFieldUncontrolled } from '../password/uncontrolledForm/PasswordFieldUncontrolled';
import { ConfirmPasswordUncontrolled } from '../password/uncontrolledForm/ConfirmPasswordUncontrolled';
import { Autocomplete } from '../autocomplete/Autocomplete';
import { selectCountries } from '../../store/countriesSlice';
import { formSchema } from '../../validation/validationSchema';
import { type FormValuesData } from '../../types/forms';

type Props = {
  onSuccess?: () => void;
};

export const UncontrolledForm = ({ onSuccess }: Props) => {
  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);

  const { inputFields, refs, fileRef } = useInputFields();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [countryValue, setCountryValue] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);

  const [strength, setStrength] = useState({
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasSpecial: false,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = getUserData(refs, inputFields);

    const validation = formSchema.safeParse({
      ...userData,
      file: fileRef.current?.files,
    });

    if (!validation.success) {
      const formatted = validation.error.flatten().fieldErrors;
      const map: Record<string, string> = {};

      for (const key of Object.keys(formatted) as Array<
        keyof typeof formatted
      >) {
        const messages = formatted[key];
        if (messages && messages.length > 0) {
          map[key] = messages[0];
        }
      }

      setErrors(map);
      return;
    }

    let fileBase64: string | null = null;

    const file = fileRef.current?.files?.[0];

    if (file) {
      fileBase64 = await fileToBase64(file);
    }

    dispatch(
      addSubmittedForm({
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        formType: 'uncontrolled',
        data: {
          ...userData,
          fileBase64,
        } satisfies FormValuesData,
        createdAt: new Date().toISOString(),
      })
    );
    onSuccess?.();
  };
  return (
    <form onSubmit={handleSubmit} className='max-h-[80vh] overflow-y-auto p-4'>
      {inputFields.map((field) => {
        if (field.name === 'country') {
          return (
            <div key={field.name} className='mb-2'>
              <input type='hidden' ref={refs.country} />
              <Autocomplete
                label={field.label}
                value={countryValue}
                onChange={(v) => {
                  setCountryValue(v);
                  if (refs.country.current) {
                    refs.country.current.value = v;
                  }
                }}
                suggestions={countries}
              />
              {errors.country && (
                <p className='text-red-600 text-sm'>{errors.country}</p>
              )}
            </div>
          );
        }

        if (field.name === 'password') {
          return (
            <div key={field.name}>
              <PasswordFieldUncontrolled
                key={field.name}
                label={field.label}
                inputRef={refs.password}
                strength={strength}
                setStrength={setStrength}
              />
              {errors.password && (
                <p className='text-red-600 text-sm'>{errors.password}</p>
              )}
            </div>
          );
        }

        if (field.name === 'confirmPassword') {
          return (
            <div key={field.name} className='mb-2'>
              <ConfirmPasswordUncontrolled
                label={field.label}
                inputRef={refs.confirmPassword}
                passwordRef={refs.password}
              />
              {errors.confirmPassword && (
                <p className='text-red-600 text-sm'>{errors.confirmPassword}</p>
              )}
            </div>
          );
        }

        if (field.type === 'checkbox') {
          return (
            <div key={field.name} className='mb-2 flex items-center gap-2'>
              <input
                ref={refs[field.name]}
                id={field.name}
                type='checkbox'
                className='w-4 h-4 cursor-pointer'
              />
              <span>{field.label}</span>
              {errors.terms && (
                <p className='text-red-600 text-sm'>{errors.terms}</p>
              )}
            </div>
          );
        }

        if (field.type === 'select') {
          return (
            <div key={field.name} className='mb-2'>
              <label htmlFor={field.name} className='block mb-1 font-medium'>
                {field.label}
              </label>
              <select
                ref={refs.gender}
                id={field.name}
                className='border p-2 rounded w-full'
              >
                <option value=''>Select gender</option>
                <option value='female'>Female</option>
                <option value='male'>Male</option>
              </select>
              {errors.gender && (
                <p className='text-red-600 text-sm'>{errors.gender}</p>
              )}
            </div>
          );
        }

        return (
          <div key={field.name} className='mb-2'>
            <label>{field.label}</label>
            <input
              ref={refs[field.name]}
              type={field.type}
              className='border p-2 rounded w-full'
            />
            {errors[field.name] && (
              <p className='text-red-600 text-sm'>{errors[field.name]}</p>
            )}
          </div>
        );
      })}

      <div className='mb-2'>
        <label className='block mb-1 font-medium'>Upload Image</label>

        <input
          ref={fileRef}
          id='file'
          type='file'
          accept='image/png, image/jpeg'
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

        <p className='mt-2 text-sm text-gray-600'>
          {fileName ? `Selected: ${fileName}` : 'No file chosen'}
        </p>

        {errors.file && <p className='text-red-600 text-sm'>{errors.file}</p>}
      </div>

      <div className='flex justify-center'>
        <button
          type='submit'
          className='mt-4 bg-emerald-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-emerald-500'
        >
          Submit
        </button>
      </div>
    </form>
  );
};
