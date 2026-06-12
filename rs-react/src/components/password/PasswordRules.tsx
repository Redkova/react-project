import { type Strength } from '../../utils/getPasswordStrength';

type Props = {
  strength: Strength;
  showRules: boolean;
};

export const PasswordRules = ({ strength, showRules }: Props) => {
  if (!showRules) return null;

  return (
    <div className='text-sm mt-1 space-y-1 mb-4'>
      <p className={strength.hasUpper ? 'text-green-600' : 'text-red-600'}>
        • Password must contain at least 1 uppercase letter
      </p>
      <p className={strength.hasLower ? 'text-green-600' : 'text-red-600'}>
        • Password must contain at least 1 lowercase letter
      </p>
      <p className={strength.hasNumber ? 'text-green-600' : 'text-red-600'}>
        • Password must contain at least 1 number
      </p>
      <p className={strength.hasSpecial ? 'text-green-600' : 'text-red-600'}>
        • Password must contain at least 1 special character
      </p>
    </div>
  );
};
