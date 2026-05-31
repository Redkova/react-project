import { useState } from 'react';
import type { OmdbMovie } from '../../api/types';
import MovieList from './MoviesList';
import MoviesPagination from './MoviesPagination';
import MovieError from './MoviesError';
import Spinner from './Spinner';
import Button from '../ui/Button';

interface Props {
  movies: OmdbMovie[];
  loading: boolean;
  error: string | null;
  onNext: () => void;
  onPrev: () => void;
  page: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}

function ResultsSection({
  movies,
  loading,
  error,
  onNext,
  onPrev,
  page,
  isFirstPage,
  isLastPage,
}: Props) {
  const [forceError, setForceError] = useState(false);

  if (forceError) {
    throw new Error('Simulated render error');
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

        {loading && <Spinner />}

        {error && <MovieError message={error} />}

        {!loading && !error && movies.length === 0 && (
          <p className="text-center text-(text-(--text-color-secondary))">
            No results found
          </p>
        )}

        {!loading && !error && movies.length > 0 && (
          <>
            <MovieList key={page} movies={movies} />
            <MoviesPagination
              page={page}
              onNext={onNext}
              onPrev={onPrev}
              isFirstPage={isFirstPage}
              isLastPage={isLastPage}
            />
          </>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <Button
          onClick={() => setForceError(true)}
          className="text-white bg-(--error-btn-bg) border border-(--error-btn-border) hover:bg-(--error-btn-hover-bg) hover:border-(--error-btn-hover-border) hover:shadow-lg transition"
        >
          Simulate Error
        </Button>
      </div>
    </section>
  );
}

export default ResultsSection;
