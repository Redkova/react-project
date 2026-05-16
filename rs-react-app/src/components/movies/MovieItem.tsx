import type { OmdbMovie } from '../../api/types';

interface Props {
  movie: OmdbMovie;
}

function MovieItem({ movie }: Props) {
  const hasPoster =
    movie.Poster && movie.Poster !== 'N/A' && movie.Poster !== '';
  return (
    <div className="flex justify-between items-center p-4 border rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-4">
        {hasPoster && (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-14 h-20 object-cover rounded-md border"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        )}
        <h3 className="text-lg font-semibold">{movie.Title}</h3>
      </div>
      <p className="text-gray-700 text-lg font-medium">{movie.Year}</p>
    </div>
  );
}

export default MovieItem;
