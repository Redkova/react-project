import { useState } from 'react';

type Props = {
  label: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  passwordRef: React.RefObject<HTMLInputElement | null>;
};

export const ConfirmPasswordUncontrolled = ({
  label,
  inputRef,
  passwordRef,
}: Props) => {
  const [match, setMatch] = useState<boolean | null>(null);

  const handleChange = (value: string) => {
    const original = passwordRef.current?.value ?? '';
    setMatch(value === original);
  };

  return (
    <div className='mb-4'>
      <label htmlFor='confirmPassword' className='block mb-1 font-medium'>
        {label}
      </label>

      <input
        ref={inputRef}
        id='confirmPassword'
        type='password'
        className='border p-2 rounded w-full'
        onChange={(e) => handleChange(e.target.value)}
      />

      {match === false && (
        <p className='text-red-600 text-sm mt-1'>Passwords do not match</p>
      )}
    </div>
  );
};
