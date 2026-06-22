'use client';

import { ReactElement, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Spinner from '@/components/spinner/Spinner';
import { useGetMovieDetailsQuery, movieApi } from '@/api/api';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { PosterImage } from '@/components/ui/PosterImage';
import MovieError from '@/components/movies/MoviesError';
import { mapMovieError } from '@/utils/errorMapper';
import Button from '@/components/ui/Button';

function MovieDetailSection(): ReactElement {
  const router = useRouter();
  const searchParams = useSearchParams()!;
  const dispatch = useAppDispatch();

  const id = searchParams.get('details');
  const page = searchParams?.get('page') ?? '1';
  const search = searchParams?.get('search') ?? '';

  const [expanded, setExpanded] = useState(false);

  const {
    data: movie,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetMovieDetailsQuery(id!, {
    skip: !id,
  });

  function closeDetails(): void {
    router.push(`?search=${search}&page=${page}`);
  }

  function refreshDetails(): void {
    dispatch(movieApi.util.invalidateTags([{ type: 'MovieDetails' }]));
    refetch();
  }

  if (!id || !/^tt\d+$/.test(id)) {
    return <MovieError message="Movie not found" />;
  }

  if (isFetching && !movie) {
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <MovieError message={mapMovieError(error)} />;
  }

  if (!movie || movie.Response === 'False') {
    return <MovieError message="Movie not found" />;
  }

  const isLong = movie.Plot.length > 700;
  const shortPlot = isLong ? movie.Plot.slice(0, 700) + '...' : movie.Plot;

  return (
    <div className="relative w-full max-w-lg bg-(--movie-card-bg) py-6 px-4 rounded-xl shadow-(--card-border-shadow)">
      <button
        onClick={closeDetails}
        className="absolute  top-2 right-3 text-gray-500 text-2xl leading-none cursor-default md:cursor-pointer md:hover:text-red-500"
      >
        ✕
      </button>

      {isFetching && (
        <div className="absolute inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm z-[999] pointer-events-none rounded-xl">
          <Spinner />
        </div>
      )}

      <div className="flex gap-4">
        <PosterImage
          src={movie.Poster}
          alt={movie.Title}
          className="w-28 h-40"
        />

        <div className="flex flex-col justify-start gap-1">
          <h2 className="text-2xl font-bold">{movie.Title}</h2>
          <p className="text-(--text-color)">
            <strong className="text-(--text-color-secondary)">Year:</strong>{' '}
            {movie.Year}
          </p>
          <p className="text-(--text-color)">
            <strong className="text-(--text-color-secondary)">Genre:</strong>{' '}
            {movie.Genre}
          </p>
          <p className="text-(--text-color)">
            <strong className="text-(--text-color-secondary)">Country:</strong>{' '}
            {movie.Country}
          </p>
          <p className="text-(--text-color) flex items-center gap-1">
            <strong className="text-(--text-color-secondary)">IMDb:</strong>
            <span className="text-yellow-500 text-lg">★</span>
            {movie.imdbRating}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-(--text-color)">
          <strong className="text-(--text-color-secondary)">Actors:</strong>{' '}
          {movie.Actors}
        </p>
      </div>
      <p className="mt-4 text-(--text-color) leading-relaxed">
        {expanded || !isLong ? movie.Plot : shortPlot}

        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-2 text-(--link-text-color) md:hover:underline"
          >
            {expanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </p>
      <div className="flex justify-center items-center mt-4">
        <Button
          onClick={refreshDetails}
          className="bg-(--button-bg) text-white rounded-lg transition md:hover:bg-(--btn-hover-bg)"
        >
          Refresh
        </Button>
      </div>
    </div>
  );
}

export default MovieDetailSection;
