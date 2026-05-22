import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router';
import type { MovieDetailsResult } from '../api/types';
import Spinner from '../components/movies/Spinner';
import { useMovieParams } from '../hooks/useMovieParams';

export function MovieDetailSection() {
  const { page, details, updateParams } = useMovieParams();
  const [movie, setMovie] = useState<MovieDetailsResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!details) return;

    async function load() {
      const url = `https://www.omdbapi.com/?apikey=88101ce2&i=${details}&plot=full`;
      const res = await fetch(url);
      const data: MovieDetailsResult = await res.json();
      setMovie(data);
      setLoading(false);
    }

    load();
  }, [details]);

  if (!details || !/^tt\d+$/.test(details)) {
    return <p className="text-red-500 text-center">Movie not found</p>;
  }
  const pageNum = Number(page);
  if (Number.isNaN(pageNum) || pageNum < 1) {
    return <Navigate to="/404" replace />;
  }

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    );
  }

  if (!movie || movie.Response === 'False') {
    return <p className="text-red-500 text-center">Movie not found</p>;
  }

  const isLong = movie.Plot.length > 700;
  const shortPlot =
    movie.Plot.length > 700 ? movie.Plot.slice(0, 700) + '...' : movie.Plot;

  const hasPoster =
    movie.Poster && movie.Poster !== 'N/A' && movie.Poster.trim() !== '';

  const showPoster = hasPoster && !imageError;

  return (
    <div className="relative w-full max-w-lg bg-white py-6 px-4 rounded-xl shadow-lg">
      <button
        onClick={() => updateParams({ details: null })}
        className="absolute  top-2 right-3 text-gray-500 hover:text-red-500 text-2xl leading-none cursor-pointer"
      >
        ✕
      </button>
      <div className="flex gap-4">
        {showPoster ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-28 h-40 object-cover rounded-md shadow"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-28 h-40 rounded-md bg-linear-to-br from-gray-100 to-gray-300 border border-gray-200 flex flex-col items-center justify-center shadow-sm">
            <span className="text-[10px] text-gray-600 text-center leading-tight px-1">
              No image
            </span>
          </div>
        )}

        <div className="flex flex-col justify-start gap-1">
          <h2 className="text-2xl font-bold">{movie.Title}</h2>
          <p className="text-black">
            <strong className="text-gray-700">Year:</strong> {movie.Year}
          </p>
          <p className="text-black">
            <strong className="text-gray-700">Genre:</strong> {movie.Genre}
          </p>
          <p className="text-black">
            <strong className="text-gray-700">Country:</strong> {movie.Country}
          </p>
          <p className="text-black flex items-center gap-1">
            <strong className="text-gray-700">IMDb:</strong>
            <span className="text-yellow-500 text-lg">★</span>
            {movie.imdbRating}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-black">
          <strong className="text-gray-800">Actors:</strong> {movie.Actors}
        </p>
      </div>
      <p className="mt-4 text-black leading-relaxed">
        {expanded || !isLong ? movie.Plot : shortPlot}

        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-2 text-blue-600 hover:underline"
          >
            {expanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </p>
    </div>
  );
}
