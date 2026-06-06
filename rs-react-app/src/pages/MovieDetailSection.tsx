import { useState } from 'react';
import { Navigate } from 'react-router';
import Spinner from '../components/spinner/Spinner';
import { useMovieParams } from '../hooks/useMovieParams';
import { useGetMovieDetailsQuery } from '../api/api';
import { PosterImage } from '../components/ui/PosterImage';
import MovieError from '../components/movies/MoviesError';
import { mapMovieError } from '../utils/errorMapper';
import Button from '../components/ui/Button';
import { useDispatch } from 'react-redux';
import { movieApi } from '../api/api';

function hasError(value: unknown): boolean {
  return value !== null && value !== undefined;
}

export function MovieDetailSection() {
  const dispatch = useDispatch();
  const { page, details, updateParams } = useMovieParams();
  const [expanded, setExpanded] = useState(false);

  const {
    data: movie,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetMovieDetailsQuery(details!, {
    skip: !details,
  });

  function refreshDetails() {
    dispatch(movieApi.util.invalidateTags([{ type: 'MovieDetails' }]));
    refetch();
  }

  if (!details || !/^tt\d+$/.test(details)) {
    return <MovieError message="Movie not found" />;
  }

  const pageNum = Number(page);
  if (Number.isNaN(pageNum) || pageNum < 1) {
    return <Navigate to="/404" replace />;
  }

  if (isFetching && !movie) {
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    );
  }

  if (isError && hasError(error)) {
    return <MovieError message={mapMovieError(error)} />;
  }

  if (!movie || movie.Response === 'False') {
    return <MovieError message="Movie not found" />;
  }

  const isLong = movie.Plot.length > 700;
  const shortPlot =
    movie.Plot.length > 700 ? movie.Plot.slice(0, 700) + '...' : movie.Plot;

  return (
    <div className="relative w-full max-w-lg bg-(--movie-card-bg) py-6 px-4 rounded-xl shadow-(--card-border-shadow)">
      <button
        onClick={() => updateParams({ details: null })}
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
