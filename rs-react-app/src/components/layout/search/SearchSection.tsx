'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, ReactElement } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

const DEFAULT_SEARCH_TERM = 'star';

function SearchSection(): ReactElement {
  const t = useTranslations('Search');
  const router = useRouter();
  const params = useSearchParams();

  const [value, setValue] = useState<string>('');

  const [error, setError] = useState<string | null>(null);

  function handleSearch(): void {
    const trimmed = value.trim();

    if (trimmed.length === 0) {
      setError(null);
      router.push(`?search=${DEFAULT_SEARCH_TERM}&page=1`);
      return;
    }

    if (trimmed.length < 3) {
      setError('Please enter at least 3 characters');
      return;
    }

    setError(null);
    router.push(`?search=${trimmed}&page=1`);
  }
  return (
    <section className="w-full max-w-2xl bg-(--card-bg) p-6 rounded-2xl shadow-(--card-border-shadow) border">
      <form
        className="flex gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <Input
          placeholder={t('placeholder')}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <Button
          className="px-5 py-2 bg-(--button-bg) text-white rounded-lg md:hover:bg-(--btn-hover-bg) transition"
          type="submit"
        >
          {t('button')}
        </Button>
      </form>
      {error && <p className="text-red-500 text-sm mt-2 ml-1">{error}</p>}
    </section>
  );
}

export default SearchSection;
