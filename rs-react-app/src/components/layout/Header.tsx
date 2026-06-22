'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useTheme } from '../../context/useTheme';

export default function Header() {
  const t = useTranslations('Header');
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full bg-(--bg) shadow-(--header-shadow)">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <button
          onClick={toggleTheme}
          className="w-12 h-6 rounded-full bg-(--card-bg) border relative transition"
        >
          <span
            className={`absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-(--button-bg) transition ${
              theme === 'light' ? 'left-0.5' : 'left-6'
            }`}
          />
        </button>

        <h1 className="text-xl font-bold text-center">{t('title')}</h1>

        <nav className="w-24 text-right">
          <Link href="/about" className="md:hover:text-(--header-text-hover)">
            {t('about')}
          </Link>
        </nav>
      </div>
    </header>
  );
}
