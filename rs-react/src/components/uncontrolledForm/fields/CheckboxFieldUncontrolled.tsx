import { type UncontrolledFieldRendererProps } from '../FormFieldRenderUncontrolled';

export const CheckboxFieldUncontrolled = ({
  field,
  refs,
  errors,
}: UncontrolledFieldRendererProps) => {
  return (
    <div className='mb-2 flex items-center gap-2'>
      <input
        ref={refs.terms}
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
};
