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

type Props = {
  onSuccess?: () => void;
};

export const UncontrolledForm = ({ onSuccess }: Props) => {
  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);
  const { inputFields, refs, fileRef } = useInputFields();

  const [fileName, setFileName] = useState<string | null>(null);
  const [countryValue, setCountryValue] = useState('');
  const [strength, setStrength] = useState({
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasSpecial: false,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = getUserData(refs, inputFields);

    let fileBase64: string | null = null;

    const file = fileRef.current?.files?.[0];

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
        formType: 'uncontrolled',
        data: {
          ...userData,
          fileBase64,
        },
        createdAt: new Date().toISOString(),
      })
    );
    onSuccess?.();
  };
  return (
    <form onSubmit={handleSubmit}>
      {inputFields.map((field) => {
        if (field.name === 'password') {
          return (
            <PasswordFieldUncontrolled
              key={field.name}
              label={field.label}
              inputRef={refs.password}
              strength={strength}
              setStrength={setStrength}
            />
          );
        }

        if (field.name === 'confirmPassword') {
          return (
            <ConfirmPasswordUncontrolled
              key={field.name}
              label={field.label}
              inputRef={refs.confirmPassword}
              passwordRef={refs.password}
            />
          );
        }

        if (field.name === 'country') {
          return (
            <Autocomplete
              key={field.name}
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
          );
        }

        if (field.type === 'checkbox') {
          return (
            <div key={field.name} className='mb-4 flex items-center gap-2'>
              <input
                ref={refs[field.name]}
                id={field.name}
                type='checkbox'
                className='w-4 h-4 cursor-pointer'
              />
              <span>{field.label}</span>
            </div>
          );
        }

        if (field.type === 'select') {
          return (
            <div key={field.name} className='mb-4'>
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
            </div>
          );
        }

        return (
          <div key={field.name} className='mb-4'>
            <label htmlFor={field.name} className='block mb-1 font-medium'>
              {field.label}
            </label>
            <input
              ref={refs[field.name]}
              id={field.name}
              type={field.type}
              className='border p-2 rounded w-full'
            />
          </div>
        );
      })}

      <div className='mb-4'>
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
