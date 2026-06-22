'use client';

import { useState, useEffect, ReactElement } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSearchMoviesQuery } from '@/api/api';
import MovieList from '@/components/movies/MoviesList';
import MoviesPagination from '@/components/pagination/MoviesPagination';
import MovieError from '@/components/movies/MoviesError';
import Spinner from '@/components/spinner/Spinner';
import Button from '@/components/ui/Button';
import { mapMovieError } from '@/utils/errorMapper';

function ResultsSection(): ReactElement {
  const router = useRouter();
  const params = useSearchParams();

  const DEFAULT_SEARCH_TERM = 'star';
  const search = params?.get('search') ?? DEFAULT_SEARCH_TERM;
  const pageParam = params?.get('page') ?? '1';
  const page = Number(pageParam);

  useEffect(() => {
    if (!params?.get('search')) {
      router.replace(`?search=${DEFAULT_SEARCH_TERM}&page=1`);
    }
  }, [params, router]);

  const [forceError, setForceError] = useState(false);
  const { data, isLoading, isFetching, error, refetch } = useSearchMoviesQuery(
    { query: search, page },
    { skip: !search }
  );

  if (forceError) {
    throw new Error('Simulated render error');
  }

  const movies = data?.Search ?? [];
  const isFirstPage = page === 1;
  const isLastPage = movies.length < 10;

  function goToPage(newPage: number): void {
    router.push(`?search=${search}&page=${newPage}`);
  }

  function nextPage(): void {
    goToPage(page + 1);
  }

  function prevPage(): void {
    goToPage(Math.max(1, page - 1));
  }

  return (
    <section className="w-full max-w-2xl mt-6 pb-10 bg-(--card-bg) p-6 rounded-2xl shadow-(--card-border-shadow) border flex flex-col">
      <div className="className=flex-1">
        <div className="flex justify-between items-center px-2 pb-3 border-b mb-4">
          <span className="text-(--text-color-secondary) font-semibold pl-2">
            Movie name
          </span>
          <span className="text-(--text-color-secondary) font-semibold pr-2">
            Year
          </span>
        </div>

        {isLoading && <Spinner />}

        {error && <MovieError message={mapMovieError(error)} />}

        {!isLoading && !error && movies.length === 0 && (
          <p className="mt-4 text-sm text-(--error-text) bg-(--error-text-bg) border border-red-300 px-4 py-2 rounded-md text-center">
            No results found.
          </p>
        )}

        {!isLoading && !error && movies.length > 0 && (
          <>
            <MovieList key={page} movies={movies} />
            <MoviesPagination
              page={page}
              onNext={nextPage}
              onPrev={prevPage}
              isFirstPage={isFirstPage}
              isLastPage={isLastPage}
            />
          </>
        )}
      </div>

      <div className="flex flex-col justify-center items-center gap-3 mt-4">
        <Button
          onClick={() => refetch()}
          className="bg-(--button-bg) text-white rounded-lg md:hover:bg-(--btn-hover-bg) transition"
        >
          Refresh
        </Button>
        <Button
          onClick={() => setForceError(true)}
          className="text-white bg-(--error-btn-bg) border border-(--error-btn-border) md:hover:bg-(--error-btn-hover-bg) md:hover:border-(--error-btn-hover-border) md:hover:shadow-lg transition"
        >
          Simulate Error
        </Button>
      </div>
    </section>
  );
}

export default ResultsSection;
