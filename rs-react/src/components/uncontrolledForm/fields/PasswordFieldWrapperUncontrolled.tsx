import { type UncontrolledFieldRendererProps } from '../FormFieldRenderUncontrolled';
import { PasswordFieldUncontrolled } from '../../password/uncontrolledForm/PasswordFieldUncontrolled';

export const PasswordFieldWrapperUncontrolled = ({
  field,
  refs,
  errors,
  strength,
  setStrength,
}: UncontrolledFieldRendererProps) => {
  return (
    <div className='mb-2'>
      <PasswordFieldUncontrolled
        label={field.label}
        inputRef={refs.password}
        strength={strength}
        setStrength={setStrength}
      />

      {errors.password && (
        <p className='text-red-600 text-sm'>{errors.password}</p>
      )}
    </div>
  );
};
