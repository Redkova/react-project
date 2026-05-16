import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface Props {
  onSearch: (value: string) => void;
  initialValue: string;
}

function SearchSection({ onSearch, initialValue }: Props) {
  const [value, setValue] = useState(initialValue ?? '');

  return (
    <section className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-md border">
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

        <Button className="text-white" type="submit">
          Search
        </Button>
      </form>
    </section>
  );
}

export default SearchSection;
