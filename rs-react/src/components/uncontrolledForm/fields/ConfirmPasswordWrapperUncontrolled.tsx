import { type UncontrolledFieldRendererProps } from '../FormFieldRenderUncontrolled';
import { ConfirmPasswordUncontrolled } from '../../password/uncontrolledForm/ConfirmPasswordUncontrolled';

export const ConfirmPasswordWrapperUncontrolled = ({
  field,
  refs,
  errors,
}: UncontrolledFieldRendererProps) => {
  return (
    <div className='mb-2'>
      <ConfirmPasswordUncontrolled
        label={field.label}
        inputRef={refs.confirmPassword}
        passwordRef={refs.password}
      />

      {errors.confirmPassword && (
        <p className='text-red-600 text-sm'>{errors.confirmPassword}</p>
      )}
    </div>
  );
};
