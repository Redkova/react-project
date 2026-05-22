import { useState } from 'react';
import type { OmdbMovie } from '../../api/types';
import { Link } from 'react-router';
import { useMovieParams } from '../../hooks/useMovieParams';

interface Props {
  movie: OmdbMovie;
}

function MovieItem({ movie }: Props) {
  const { search, page } = useMovieParams();
  const [imageError, setImageError] = useState(false);
  const hasPoster =
    movie.Poster && movie.Poster !== 'N/A' && movie.Poster !== '';
  // const { search, page } = useMovieParams();
  const showPoster = hasPoster && !imageError;

  return (
    <Link to={`/?search=${search}&page=${page}&details=${movie.imdbID}`}>
      <div className="flex justify-between items-center p-4 border rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition">
        <div className="flex items-center gap-4">
          {showPoster ? (
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-14 h-20 object-cover rounded-md border"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-14 h-20 rounded-md bg-linear-to-br from-gray-100 to-gray-300 border border-gray-200 flex flex-col items-center justify-center shadow-sm">
              <span className="text-[10px] text-gray-600 text-center leading-tight px-1">
                No image
              </span>
            </div>
          )}
          <h3 className="text-lg font-semibold">{movie.Title}</h3>
        </div>
        <p className="text-gray-700 text-lg font-medium">{movie.Year}</p>
      </div>
    </Link>
  );
}

export default MovieItem;
