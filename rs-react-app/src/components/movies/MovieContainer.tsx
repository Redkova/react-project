import { useState } from 'react';
import { Outlet, Navigate } from 'react-router';
import SearchSection from '../search/SearchSection';
import ResultsSection from './ResultSection';
import { useMovieParams } from '../../hooks/useMovieParams';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { movieApi, useSearchMoviesQuery } from '../../api/api';
import { useDispatch } from 'react-redux';
import Spinner from './Spinner';

const DEFAULT_SEARCH_TERM = 'star';

function MovieContainer() {
  const dispatch = useDispatch();
  const [savedSearch, setSavedSearch] = useLocalStorage(
    'movie-search',
    DEFAULT_SEARCH_TERM
  );

  const [inputError, setInputError] = useState<string | null>(null);
  const { search, page, details, updateParams } = useMovieParams();
  const effectiveSearch = search || savedSearch;
  const isDetailOpen = Boolean(details);

  const { data, isLoading, isFetching, error, refetch } = useSearchMoviesQuery(
    { query: effectiveSearch, page },
    { skip: !effectiveSearch }
  );

  if (page < 1 || Number.isNaN(page)) {
    return <Navigate to="/404" replace />;
  }

  function handleSearch(value: string) {
    const trimmed = value.trim();
    if (trimmed.length < 3) {
      setInputError('Please enter at least 3 characters');
      return;
    }

    setInputError(null);
    setSavedSearch(trimmed);

    updateParams({
      search: trimmed,
      page: '1',
      details: null,
    });
  }

  function nextPage() {
    updateParams({
      search,
      page: String(page + 1),
    });
  }

  function prevPage() {
    updateParams({
      search,
      page: String(Math.max(1, page - 1)),
    });
  }

  function refreshMovies() {
    dispatch(movieApi.util.invalidateTags(['Movies']));
    refetch();
  }

  const movies = data?.Search ?? [];
  const isFirstPage = page === 1;
  const isLastPage = movies.length < 10;

  return (
    <>
      <div
        className={
          isDetailOpen
            ? 'flex w-full gap-1 px-8 md:flex-row flex-col'
            : 'flex w-full justify-center'
        }
      >
        <div
          className={
            isDetailOpen
              ? 'md:w-[50%] w-full relative'
              : 'w-full max-w-2xl relative'
          }
        >
          {(isLoading || isFetching) && (
            <div className="fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm z-[999] pointer-events-none">
              <Spinner />
            </div>
          )}

          <SearchSection
            key={search || 'empty'}
            onSearch={handleSearch}
            initialValue={search}
            error={inputError}
          />

          <ResultsSection
            movies={movies}
            loading={isLoading}
            fetching={isFetching}
            error={inputError || error}
            onNext={nextPage}
            onPrev={prevPage}
            page={page}
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
            onRefresh={refreshMovies}
          />
        </div>
        {isDetailOpen && (
          <div className="hidden md:flex w-[50%] pl-2 pt-30 justify-center sticky top-0 h-fit">
            <Outlet />
          </div>
        )}
      </div>

      {isDetailOpen && (
        <div className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] flex justify-center items-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-xl shadow-xl flex justify-center overflow-auto max-h-[90vh] p-4">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
}

export default MovieContainer;
