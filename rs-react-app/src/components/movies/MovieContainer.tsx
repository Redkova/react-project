import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router';
import type { OmdbMovie } from '../../api/types';
import SearchSection from '../search/SearchSection';
import ResultsSection from './ResultSection';
import { fetchMovies } from '../../api/services/movieService';
import { useMovieParams } from '../../hooks/useMovieParams';

const DEFAULT_SEARCH_TERM = 'star';

function MovieContainer() {
  const { search, page, details, updateParams } = useMovieParams();
  const effectiveSearch = search || DEFAULT_SEARCH_TERM;
  const isDetailOpen = Boolean(details);

  if (page < 1 || Number.isNaN(page)) {
    return <Navigate to="/404" replace />;
  }

  const [results, setResults] = useState<OmdbMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const { movies, error } = await fetchMovies(effectiveSearch, page);

      setResults(movies);
      setError(error);
      setLoading(false);
    }

    void load();

    return () => {};
  }, [effectiveSearch, page]);

  function handleSearch(value: string) {
    const trimmed = value.trim();
    if (trimmed.length < 3) {
      setError('Please enter at least 3 characters');
      return;
    }

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

  const isFirstPage = page === 1;
  const isLastPage = results.length < 10;

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
          />

          <ResultsSection
            movies={results}
            loading={loading}
            error={error}
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
