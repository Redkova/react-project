'use client';

import { ReactElement } from 'react';
import { useTranslations } from 'next-intl';

interface Props {
  message: string;
}
function MovieError({ message }: Props): ReactElement {
  const t = useTranslations('Errors');

  return (
    <p className="mt-4 text-sm text-(--error-text) bg-(--error-text-bg) border border-red-300 px-4 py-2 rounded-md text-center">
      {t(message)}
    </p>
  );
}

export default MovieError;
