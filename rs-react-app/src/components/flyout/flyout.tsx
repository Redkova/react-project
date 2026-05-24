import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { unselectAllMovies } from '../../store/selectedMoviesSlice';
import Button from '../ui/Button';
import { downloadMoviesCsv } from '../../utils/downloadMoviesCsv';

export function SelectedMoviesFlyout() {
  const dispatch = useAppDispatch();

  const selectedMovies = useAppSelector(
    (state) => state.selectedMovies.selectedMovies
  );

  const selectedMoviesCount = selectedMovies.length;

  if (selectedMoviesCount === 0) return null;

  const handleDownload = () => {
    downloadMoviesCsv(selectedMovies);
  };

  return (
    <>
      <div
        className="fixed bottom-0 left-0 right-0
        bg-white border-t shadow-lg
        p-4 flex flex-col items-center gap-3
        z-50"
      >
        <p className="text-lg font-medium text-center">
          Selected movies:{' '}
          <span className="font-bold">{selectedMoviesCount}</span>
        </p>

        <div className="flex gap-3">
          <Button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
            onClick={() => dispatch(unselectAllMovies())}
          >
            Unselect all
          </Button>

          <Button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={handleDownload}
          >
            Download
          </Button>
        </div>
      </div>
    </>
  );
}
