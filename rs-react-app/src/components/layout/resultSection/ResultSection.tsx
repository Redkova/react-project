'use client';

import { ReactElement } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import MovieList from '@/components/movies/MoviesList';
import MoviesPagination from '@/components/pagination/MoviesPagination';
import Button from '@/components/ui/Button';

interface Props {
  movies: any[];
  search: string;
  page: number;
}

export default function ResultsSection({
  movies,
  search,
  page,
}: Props): ReactElement {
  const router = useRouter();
  const t = useTranslations('ResultsSection');

  const isFirstPage = page === 1;
  const isLastPage = movies.length < 10;

  function goToPage(newPage: number): void {
    router.push(`?search=${search}&page=${newPage}`);
  }

  return (
    <section className="w-full max-w-2xl mt-6 pb-10 bg-(--card-bg) p-6 rounded-2xl shadow-(--card-border-shadow) border flex flex-col">
      <div className="flex-1">
        <div className="flex justify-between items-center px-2 pb-3 border-b mb-4">
          <span className="text-(--text-color-secondary) font-semibold pl-2">
            {t('movieName')}
          </span>
          <span className="text-(--text-color-secondary) font-semibold pr-2">
            {t('year')}
          </span>
        </div>

        {movies.length === 0 && (
          <p className="mt-4 text-sm text-(--error-text) bg-(--error-text-bg) border border-red-300 px-4 py-2 rounded-md text-center">
            No results found.
          </p>
        )}

        {movies.length > 0 && (
          <>
            <MovieList key={page} movies={movies} />
            <MoviesPagination
              page={page}
              onNext={() => goToPage(page + 1)}
              onPrev={() => goToPage(page - 1)}
              isFirstPage={isFirstPage}
              isLastPage={isLastPage}
            />
          </>
        )}
      </div>
      <div className="flex flex-col justify-center items-center gap-3 mt-4">
        <Button
          onClick={() => router.refresh()}
          className="bg-(--button-bg) text-white rounded-lg md:hover:bg-(--btn-hover-bg) transition"
        >
          {t('refresh')}
        </Button>
      </div>
    </section>
  );
}
