import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addSubmittedForm } from '../../store/submittedFormsSlice';
import { fileToBase64 } from '../../utils/fileToBase64';
import { useState } from 'react';
import { selectCountries } from '../../store/countriesSlice';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  formSchema,
  type FormValuesData,
} from '../../validation/validationSchema';
import { formFields } from '../../constants/constants';
import { FormFieldRendererRHF } from './FormFieldRenderRHF';

export const ReactHookForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormValuesData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const [fileName, setFileName] = useState<string | null>(null);
  const onSubmit = async (formValues: FormValuesData) => {
    const file = formValues.file?.[0] ?? null;

    const fileBase64 = await fileToBase64(file);

    const { file: _removed, ...rest } = formValues;

    dispatch(
      addSubmittedForm({
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        formType: 'RHF',
        data: {
          ...rest,
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
      {formFields.map((field) => (
        <FormFieldRendererRHF
          key={field.name}
          field={field}
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
          countries={countries}
          fileName={fileName}
          setFileName={setFileName}
        />
      ))}

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
