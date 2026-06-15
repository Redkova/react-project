import { type FieldRendererProps } from '../FormFieldRenderRHF';

export const CheckboxFieldRHF = ({
  field,
  register,
  errors,
}: FieldRendererProps) => (
  <div className='mb-2 flex items-center gap-2'>
    <input
      id={field.name}
      type='checkbox'
      {...register(field.name)}
      className='w-4 h-4 cursor-pointer'
    />
    <span>{field.label}</span>

    {errors[field.name] && (
      <p className='text-red-600 text-sm'>{errors[field.name]?.message}</p>
    )}
  </div>
);
