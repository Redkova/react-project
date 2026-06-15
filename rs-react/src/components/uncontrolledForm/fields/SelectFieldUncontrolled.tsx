import { type UncontrolledFieldRendererProps } from '../FormFieldRenderUncontrolled';

export const SelectFieldUncontrolled = ({
  field,
  refs,
  errors,
}: UncontrolledFieldRendererProps) => {
  return (
    <div className='mb-2'>
      <label>{field.label}</label>
      <select ref={refs.gender} className='border p-2 rounded w-full'>
        <option value=''>Select gender</option>
        <option value='female'>Female</option>
        <option value='male'>Male</option>
      </select>
      {errors.gender && <p className='text-red-600 text-sm'>{errors.gender}</p>}
    </div>
  );
};
