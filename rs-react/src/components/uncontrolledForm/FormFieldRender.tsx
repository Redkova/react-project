import { Autocomplete } from '../autocomplete/Autocomplete';
import { PasswordFieldUncontrolled } from '../password/uncontrolledForm/PasswordFieldUncontrolled';
import { ConfirmPasswordUncontrolled } from '../password/uncontrolledForm/ConfirmPasswordUncontrolled';
import { type InputField } from '../../types/forms';
import { type Refs } from '../../types/forms';

type StrengthState = {
  hasUpper: boolean;
  hasLower: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
};

type Props = {
  field: InputField;
  refs: Refs;
  errors: Record<string, string>;
  countries: string[];
  countryValue: string;
  setCountryValue: (v: string) => void;
  strength: StrengthState;
  setStrength: React.Dispatch<React.SetStateAction<StrengthState>>;
  fileRef: React.RefObject<HTMLInputElement | null>;
  fileName: string | null;
  setFileName: (v: string | null) => void;
};

export const FormFieldRenderer = ({
  field,
  refs,
  errors,
  countries,
  countryValue,
  setCountryValue,
  strength,
  setStrength,
  fileRef,
  fileName,
  setFileName,
}: Props) => {
  switch (field.type) {
    case 'autocomplete':
      return (
        <div className='mb-2'>
          <input type='hidden' ref={refs.country} />
          <Autocomplete
            label={field.label}
            value={countryValue}
            onChange={(v) => {
              setCountryValue(v);
              if (refs.country.current) refs.country.current.value = v;
            }}
            suggestions={countries}
          />
          {errors.country && (
            <p className='text-red-600 text-sm'>{errors.country}</p>
          )}
        </div>
      );

    case 'password':
      if (field.name === 'password') {
        return (
          <div className='mb-2'>
            <PasswordFieldUncontrolled
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
          <div className='mb-2'>
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

      return null;

    case 'checkbox':
      return (
        <div className='mb-2 flex items-center gap-2'>
          <input
            ref={refs[field.name]}
            id={field.name}
            type='checkbox'
            className='w-4 h-4 cursor-pointer'
          />
          <span>{field.label}</span>
          {errors[field.name] && (
            <p className='text-red-600 text-sm'>{errors[field.name]}</p>
          )}
        </div>
      );

    case 'select':
      return (
        <div className='mb-2'>
          <label>{field.label}</label>
          <select ref={refs.gender} className='border p-2 rounded w-full'>
            <option value=''>Select gender</option>
            <option value='female'>Female</option>
            <option value='male'>Male</option>
          </select>
          {errors.gender && (
            <p className='text-red-600 text-sm'>{errors.gender}</p>
          )}
        </div>
      );

    case 'file':
      return (
        <div className='mb-2'>
          <label className='block mb-1 font-medium'>{field.label}</label>

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
      );

    default:
      return (
        <div className='mb-2'>
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
  }
};
