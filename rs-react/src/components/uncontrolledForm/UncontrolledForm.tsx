import { useDispatch, useSelector } from 'react-redux';
import { addSubmittedForm } from '../../store/submittedFormsSlice';
import { useInputFields } from '../../hooks/useInputFields';
import { getUserData } from '../../utils/getUserData';
import { fileToBase64 } from '../../utils/fileToBase64';
import { useState } from 'react';
import { selectCountries } from '../../store/countriesSlice';
import { formSchema } from '../../validation/validationSchema';
import { type FormValuesData } from '../../types/forms';
import { formFields } from '../../constants/constants';
import { FormFieldRendererUncontrolled } from './FormFieldRenderUncontrolled';

type Props = {
  onSuccess?: () => void;
};

export const UncontrolledForm = ({ onSuccess }: Props) => {
  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);

  const { refs, fileRef } = useInputFields();

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

    const userData = getUserData(refs, formFields);

    const validation = formSchema.safeParse({
      ...userData,
      file: fileRef.current?.files,
    });

    if (!validation.success) {
      const formatted = validation.error.flatten().fieldErrors;
      const map: Record<string, string> = {};

      for (const key of Object.keys(formatted) as (keyof typeof formatted)[]) {
        const messages = formatted[key];
        if (messages?.length) {
          map[key] = messages[0];
        }
      }

      setErrors(map);
      return;
    }

    const file = fileRef.current?.files?.[0];
    const fileBase64 = file ? await fileToBase64(file) : null;

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
      {formFields.map((field) => (
        <FormFieldRendererUncontrolled
          key={field.name}
          field={field}
          refs={refs}
          errors={errors}
          countries={countries}
          countryValue={countryValue}
          setCountryValue={setCountryValue}
          strength={strength}
          setStrength={setStrength}
          fileRef={fileRef}
          fileName={fileName}
          setFileName={setFileName}
        />
      ))}

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
