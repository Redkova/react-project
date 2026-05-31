import { useState } from 'react';
import type { OmdbMovie } from '../../api/types';
import { useNavigate } from 'react-router';
import { useMovieParams } from '../../hooks/useMovieParams';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { toggleMovieSelection } from '../../store/selectedMoviesSlice';
import { Checkbox } from '../ui/Checkbox';

interface Props {
  movie: OmdbMovie;
}

function MovieItem({ movie }: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { search, page } = useMovieParams();
  const [imageError, setImageError] = useState(false);

  const isSelected = useAppSelector((state) =>
    state.selectedMovies.movieItems.some((m) => m.imdbID === movie.imdbID)
  );

  const hasPoster =
    movie.Poster && movie.Poster !== 'N/A' && movie.Poster !== '';

  const showPoster = hasPoster && !imageError;

  const handleOpenDetails = () => {
    navigate(`/?search=${search}&page=${page}&details=${movie.imdbID}`);
  };

  const handleCheckboxChange = () => {
    dispatch(toggleMovieSelection(movie));
  };

  return (
    <div
      onClick={handleOpenDetails}
      className="flex justify-between items-center p-4 border rounded-xl bg-(--movie-card-bg) shadow-(--card-border-shadow) hover:shadow-(--card-border-hover-shadow) transition cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <Checkbox checked={isSelected} onChange={handleCheckboxChange} />

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
      <p className="text-(--text-color-secondary) text-lg font-medium">
        {movie.Year}
      </p>
    </div>
  );
}

export default MovieItem;
