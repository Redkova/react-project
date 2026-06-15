import { type FieldRendererProps } from '../FormFieldRenderRHF';

export const TextFieldRHF = ({
  field,
  register,
  errors,
}: FieldRendererProps) => (
  <div className='mb-2'>
    <label>{field.label}</label>
    <input
      {...register(field.name)}
      type={field.type}
      className='border p-2 rounded w-full'
    />
    {errors[field.name] && (
      <p className='text-red-600 text-sm'>{errors[field.name]?.message}</p>
    )}
  </div>
);
