import { type UncontrolledFieldRendererProps } from '../FormFieldRenderUncontrolled';

export const TextFieldUncontrolled = ({
  field,
  refs,
  errors,
}: UncontrolledFieldRendererProps) => {
  const inputRef =
    field.name === 'name'
      ? refs.name
      : field.name === 'age'
        ? refs.age
        : refs.email;
  return (
    <div className='mb-2'>
      <label>{field.label}</label>
      <input
        ref={inputRef}
        type={field.type}
        className='border p-2 rounded w-full'
      />
      {errors[field.name] && (
        <p className='text-red-600 text-sm'>{errors[field.name]}</p>
      )}
    </div>
  );
};
