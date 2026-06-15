import { Autocomplete } from '../../autocomplete/Autocomplete';
import { type FieldRendererProps } from '../FormFieldRenderRHF';

export const AutocompleteFieldRHF = ({
  field,
  watch,
  setValue,
  errors,
  countries,
}: FieldRendererProps) => {
  const raw = watch(field.name);
  const value = typeof raw === 'string' ? raw : '';

  return (
    <div className='mb-2'>
      <Autocomplete
        label={field.label}
        value={value}
        suggestions={countries}
        onChange={(v) => {
          setValue(field.name, v, { shouldValidate: true });
        }}
      />

      {errors[field.name] && (
        <p className='text-red-600 text-sm'>{errors[field.name]?.message}</p>
      )}
    </div>
  );
};
