import { useState } from 'react';
import type { OmdbMovie } from '../../../api/types';
import MovieList from '../../movies/MoviesList';
import MoviesPagination from '../../pagination/MoviesPagination';
import MovieError from '../../movies/MoviesError';
import Spinner from '../../spinner/Spinner';
import Button from '../../ui/Button';
import { mapMovieError } from '../../../utils/errorMapper';

interface Props {
  movies: OmdbMovie[];
  loading: boolean;
  fetching: boolean;
  error: unknown;
  onNext: () => void;
  onPrev: () => void;
  page: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  onRefresh: () => void;
}

function hasError(value: unknown): boolean {
  return value !== null && value !== undefined;
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
  onRefresh,
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

        {hasError(error) ? <MovieError message={mapMovieError(error)} /> : null}

        {!loading && !error && movies.length === 0 && (
          <p className="mt-4 text-sm text-(--error-text) bg-(--error-text-bg) border border-red-300 px-4 py-2 rounded-md text-center">
            No results found.
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

      <div className="flex flex-col justify-center items-center gap-3 mt-4">
        <Button
          onClick={onRefresh}
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
