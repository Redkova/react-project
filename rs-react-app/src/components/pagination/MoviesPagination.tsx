import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

interface Props {
  page: number;
  search: string;
  isFirstPage: boolean;
  isLastPage: boolean;
}

function MoviesPagination({ page, search, isFirstPage, isLastPage }: Props) {
  const t = useTranslations('Pagination');

  const prevPage = page - 1;
  const nextPage = page + 1;

  return (
    <div className="flex justify-center gap-4 mt-6">
      <Link
        href={`?search=${search}&page=${prevPage}`}
        className={
          isFirstPage
            ? 'px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed'
            : 'px-4 py-2 bg-gray-200 text-black rounded-lg md:hover:bg-gray-300'
        }
        aria-disabled={isFirstPage}
      >
        {t('prev')}
      </Link>

      <span className="font-semibold">Page {page}</span>

      <Link
        href={`?search=${search}&page=${nextPage}`}
        className={
          isLastPage
            ? 'px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed'
            : 'px-4 py-2 bg-gray-200 text-black rounded-lg md:hover:bg-gray-300'
        }
        aria-disabled={isLastPage}
      >
        {t('next')}
      </Link>
    </div>
  );
}

export default MoviesPagination;
