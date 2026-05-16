import { useEffect, useState } from 'react';

import type { OmdbMovie } from '../../api/types';

import SearchSection from '../search/SearchSection';
import ResultsSection from './ResultSection';

import { storage } from '../../utils/storage';
import { fetchMovies } from '../../api/services/movieService';

const DEFAULT_QUERY = 'star';

function MovieContainer() {
  const savedSearch = storage.getSearch();
  const savedPage = storage.getPage() || 1;
  const initialSearch = savedSearch || '';
  const initialQuery = savedSearch || DEFAULT_QUERY;

  const [results, setResults] = useState<OmdbMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState(initialSearch);
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(savedPage);

  const loadMovies = async (currentQuery: string, currentPage: number) => {
    try {
      const { movies, error } = await fetchMovies(currentQuery, currentPage);

      return {
        movies,
        error: error ?? null,
      };
    } catch {
      return {
        movies: [],
        error: 'Failed to load data',
      };
    }
  };

  useEffect(() => {
    let cancelled = false;

    void loadMovies(query, page).then(({ movies, error }) => {
      if (cancelled) return;

      setResults(movies);
      setError(error);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [query, page]);

  const handleSearch = async (value: string) => {
    const trimmed = value.trim();

    if (trimmed.length < 3) {
      setError('Please enter at least 3 characters');
      return;
    }

    storage.setSearch(trimmed);
    storage.setPage(1);

    setLoading(true);
    setSearch(trimmed);
    setQuery(trimmed);
    setPage(1);
    setError(null);

    const { movies, error } = await loadMovies(trimmed, 1);

    setResults(movies);
    setError(error);
    setLoading(false);
  };

  const nextPage = async () => {
    const newPage = page + 1;

    storage.setPage(newPage);

    setLoading(true);
    setPage(newPage);

    const { movies, error } = await loadMovies(query, newPage);

    setResults(movies);
    setError(error);
    setLoading(false);
  };

  const prevPage = async () => {
    const newPage = Math.max(page - 1, 1);

    storage.setPage(newPage);

    setLoading(true);
    setPage(newPage);

    const { movies, error } = await loadMovies(query, newPage);

    setResults(movies);
    setError(error);
    setLoading(false);
  };

  return (
    <>
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
      />
    </>
  );
}

export default MovieContainer;
