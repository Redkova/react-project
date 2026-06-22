'use client';

import { useTranslations } from 'next-intl';
import Button from '../ui/Button';

interface Props {
  page: number;
  onNext: () => void;
  onPrev: () => void;
  isFirstPage: boolean;
  isLastPage: boolean;
}

function MoviesPagination({
  page,
  onNext,
  onPrev,
  isFirstPage,
  isLastPage,
}: Props) {
  const t = useTranslations('Pagination');
  return (
    <div className="flex justify-center gap-4 mt-6">
      <Button
        onClick={onPrev}
        disabled={isFirstPage}
        className={
          isFirstPage
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gray-200 text-black md:hover:bg-gray-300'
        }
      >
        {t('prev')}
      </Button>

      <span className="font-semibold">Page {page}</span>

      <Button
        onClick={onNext}
        disabled={isLastPage}
        className={
          isLastPage
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gray-200 text-black md:hover:bg-gray-300'
        }
      >
        {t('next')}
      </Button>
    </div>
  );
}

export default MoviesPagination;
