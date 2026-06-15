import { Autocomplete } from '../../autocomplete/Autocomplete';
import { type UncontrolledFieldRendererProps } from '../FormFieldRenderUncontrolled';

export const AutocompleteFieldUncontrolled = ({
  field,
  refs,
  errors,
  countries,
  countryValue,
  setCountryValue,
}: UncontrolledFieldRendererProps) => {
  return (
    <div className='mb-2'>
      <input type='hidden' ref={refs.country} />
      <Autocomplete
        label={field.label}
        value={countryValue}
        onChange={(v) => {
          setCountryValue(v);
          if (refs.country?.current) {
            refs.country.current.value = v;
          }
        }}
        suggestions={countries}
      />
      {errors[field.name] && (
        <p className='text-red-600 text-sm'>{errors[field.name]}</p>
      )}
    </div>
  );
};
