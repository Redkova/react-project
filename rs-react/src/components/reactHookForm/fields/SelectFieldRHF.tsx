import { type FieldRendererProps } from '../FormFieldRenderRHF';

export const SelectFieldRHF = ({
  field,
  register,
  errors,
}: FieldRendererProps) => (
  <div className='mb-2'>
    <label>{field.label}</label>

    <select {...register(field.name)} className='border p-2 rounded w-full'>
      <option value=''>Select gender</option>
      <option value='female'>Female</option>
      <option value='male'>Male</option>
    </select>

    {errors[field.name] && (
      <p className='text-red-600 text-sm'>{errors[field.name]?.message}</p>
    )}
  </div>
);
