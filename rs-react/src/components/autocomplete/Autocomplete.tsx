import { useState } from 'react';

type Props = {
  label: string;
  value: string;
  onChange: (selectedValue: string) => void;
  suggestions: string[];
};

export const Autocomplete = ({
  label,
  value,
  onChange,
  suggestions,
}: Props) => {
  const [open, setOpen] = useState(false);

  const filtered = value.length
    ? suggestions.filter((country) =>
        country.toLowerCase().includes(value.toLowerCase())
      )
    : [];

  return (
    <div className='mb-4 relative'>
      <label className='block mb-1 font-medium'>{label}</label>

      <input
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        className='border p-2 rounded w-full'
      />

      {open && filtered.length > 0 && (
        <ul className='absolute left-0 right-0 bg-white border rounded shadow mt-1 z-10'>
          {filtered.map((country) => (
            <li
              key={country}
              className='p-2 hover:bg-gray-100 cursor-pointer'
              onClick={() => {
                onChange(country);
                setOpen(false);
              }}
            >
              {country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
