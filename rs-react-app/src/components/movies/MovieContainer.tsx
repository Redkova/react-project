import { useState } from 'react';
import { Outlet, Navigate } from 'react-router';
import SearchSection from '../search/SearchSection';
import ResultsSection from './ResultSection';
import { useMovieParams } from '../../hooks/useMovieParams';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useSearchMoviesQuery } from '../../api/api';

const DEFAULT_SEARCH_TERM = 'star';

function MovieContainer() {
  const [savedSearch, setSavedSearch] = useLocalStorage(
    'movie-search',
    DEFAULT_SEARCH_TERM
  );
  const { search, page, details, updateParams } = useMovieParams();
  const effectiveSearch = search || savedSearch;
  const isDetailOpen = Boolean(details);

  const [error, setError] = useState<string | null>(null);

  const { data, isLoading, isError } = useSearchMoviesQuery(
    { query: effectiveSearch, page },
    { skip: !effectiveSearch }
  );

  if (page < 1 || Number.isNaN(page)) {
    return <Navigate to="/404" replace />;
  }

  function handleSearch(value: string) {
    const trimmed = value.trim();
    if (trimmed.length < 3) {
      setError('Please enter at least 3 characters');
      return;
    }

    setError(null);
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

  const movies = data?.Search ?? [];
  const isFirstPage = page === 1;
  const isLastPage = movies.length < 10;

  return (
    <>
      <div
        className={
          isDetailOpen ? 'flex w-full gap-1 px-8' : 'flex w-full justify-center'
        }
      >
        <div className={isDetailOpen ? 'w-[50%]' : 'w-full max-w-2xl'}>
          <SearchSection
            key={search || 'empty'}
            onSearch={handleSearch}
            initialValue={search}
            error={error}
          />

          <ResultsSection
            movies={movies}
            loading={isLoading}
            error={isError ? 'Failed to load movies' : null}
            onNext={nextPage}
            onPrev={prevPage}
            page={page}
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
          />
        </div>
        {isDetailOpen && (
          <div className="w-[50%] pl-2 pt-30 flex justify-center sticky top-0 h-fit">
            <Outlet />
          </div>
        )}
      </div>
    </>
  );
}

export default MovieContainer;
