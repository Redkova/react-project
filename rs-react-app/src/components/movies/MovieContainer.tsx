import { useEffect, useState } from 'react';

import type { OmdbMovie } from '../../api/types';

import SearchSection from '../search/SearchSection';
import ResultsSection from './ResultSection';

import { storage } from '../../utils/storage';
import { fetchMovies } from '../../api/services/movieService';

function MovieContainer() {
  const [results, setResults] = useState<OmdbMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const loadMovies = async (currentSearch = search, currentPage = page) => {
    setLoading(true);
    setError(null);

    try {
      const { movies, error } = await fetchMovies(currentSearch, currentPage);

      setResults(movies);
      setError(error);
    } catch {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedSearch = storage.getSearch();
    const savedPage = storage.getPage();

    if (savedSearch) {
      setSearch(savedSearch);
      setPage(savedPage);

      loadMovies(savedSearch, savedPage);
    } else {
      loadMovies('star', 1);
    }
  }, []);

  const handleSearch = (value: string) => {
    const trimmed = value.trim();

    if (trimmed.length < 3) {
      setError('Please enter at least 3 characters');
      return;
    }

    if (trimmed === search) return;

    storage.setSearch(trimmed);
    storage.setPage(1);

    setSearch(trimmed);
    setPage(1);
    setError(null);

    loadMovies(trimmed, 1);
  };

  const nextPage = () => {
    const newPage = page + 1;

    storage.setPage(newPage);

    setPage(newPage);

    loadMovies(search, newPage);
  };

  const prevPage = () => {
    const newPage = Math.max(page - 1, 1);

    storage.setPage(newPage);

    setPage(newPage);

    loadMovies(search, newPage);
  };

  return (
    <>
      <SearchSection onSearch={handleSearch} initialValue={search} />

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
