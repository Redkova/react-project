import { useState } from 'react';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

interface Props {
  onSearch: (value: string) => void;
  initialValue: string;
  error?: string | null;
}

function SearchSection({ onSearch, initialValue, error }: Props) {
  const [value, setValue] = useState(initialValue ?? '');

  return (
    <section className="w-full max-w-2xl bg-(--card-bg) p-6 rounded-2xl shadow-(--card-border-shadow) border">
      <form
        className="flex gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(value);
        }}
      >
        <Input
          placeholder="Search movies by title"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <Button
          className="px-5 py-2 bg-(--button-bg) text-white rounded-lg md:hover:bg-(--btn-hover-bg) transition"
          type="submit"
        >
          Search
        </Button>
      </form>
      {error && <p className="text-red-500 text-sm mt-2 ml-1">{error}</p>}
    </section>
  );
}

export default SearchSection;
