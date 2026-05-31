import type { OmdbMovie } from '../../api/types';
import { useNavigate } from 'react-router';
import { useMovieParams } from '../../hooks/useMovieParams';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { toggleMovieSelection } from '../../store/selectedMoviesSlice';
import { Checkbox } from '../ui/Checkbox';
import { PosterImage } from '../ui/PosterImage';

interface Props {
  movie: OmdbMovie;
}

function MovieItem({ movie }: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { search, page } = useMovieParams();

  const isSelected = useAppSelector((state) =>
    state.selectedMovies.movieItems.some((m) => m.imdbID === movie.imdbID)
  );

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

        <PosterImage
          src={movie.Poster}
          alt={movie.Title}
          className="w-14 h-20"
        />

        <h3 className="text-lg font-semibold">{movie.Title}</h3>
      </div>
      <p className="text-(--text-color-secondary) text-lg font-medium">
        {movie.Year}
      </p>
    </div>
  );
}

export default MovieItem;
