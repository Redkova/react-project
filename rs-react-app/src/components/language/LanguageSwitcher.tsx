'use client';

import { useState } from 'react';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';

const LANGUAGES = {
  en: 'English',
  ru: 'Русский',
};

const LANGUAGE_CODES = {
  en: 'EN',
  ru: 'RU',
};

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('Header');

  const locale = useLocale() as 'en' | 'ru';

  const [open, setOpen] = useState(false);

  function switchLanguage(locale: 'en' | 'ru') {
    const params = new URLSearchParams(window.location.search);

    router.replace(`${pathname}?${params.toString()}`, { locale });
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-1 bg-(--button-bg) text-white rounded-lg md:hover:bg-(--btn-hover-bg) transition md:cursor-pointer"
      >
        {LANGUAGE_CODES[locale]}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 bg-(--card-bg) border rounded-md shadow-lg z-50">
          {Object.entries(LANGUAGES)
            .filter(([code]) => code !== locale)
            .map(([code, label]) => (
              <button
                key={code}
                onClick={() => switchLanguage(code as 'en' | 'ru')}
                className="block w-full text-left px-4 py-2 md:hover:bg-(--btn-hover-bg) transition md:cursor-pointer"
              >
                {label}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
