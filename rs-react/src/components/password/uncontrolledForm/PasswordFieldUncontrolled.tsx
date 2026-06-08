import {
  type Strength,
  getPasswordStrength,
} from '../../../utils/getPasswordStrength';

type Props = {
  label: string;
  inputRef: React.RefObject<HTMLInputElement>;
  strength: Strength;
  setStrength: (s: Strength) => void;
};

export const PasswordFieldUncontrolled = ({
  label,
  inputRef,
  strength,
  setStrength,
}: Props) => {
  const isValid =
    strength.hasUpper &&
    strength.hasLower &&
    strength.hasNumber &&
    strength.hasSpecial;

  const showRules = !isValid && (inputRef.current?.value?.length ?? 0) > 0;

  return (
    <div className='mb-4'>
      <label htmlFor='password' className='block mb-1 font-medium'>
        {label}
      </label>

      <input
        ref={inputRef}
        id='password'
        type='password'
        className='border p-2 rounded w-full'
        onChange={(e) => setStrength(getPasswordStrength(e.target.value))}
      />

      {showRules && (
        <div className='text-sm mt-1 space-y-1'>
          <p className={strength.hasUpper ? 'text-green-600' : 'text-red-600'}>
            • Password must contain at least 1 uppercase letter
          </p>
          <p className={strength.hasLower ? 'text-green-600' : 'text-red-600'}>
            • Password must contain at least 1 lowercase letter
          </p>
          <p className={strength.hasNumber ? 'text-green-600' : 'text-red-600'}>
            • Password must contain at least 1 number
          </p>
          <p
            className={strength.hasSpecial ? 'text-green-600' : 'text-red-600'}
          >
            • Password must contain at least 1 special character
          </p>
        </div>
      )}
    </div>
  );
};
