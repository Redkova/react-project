'use client';

import { useTranslations } from 'next-intl';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { unselectAllMovies } from '../../store/selectedMoviesSlice';
import Button from '../ui/Button';
import {
  selectSelectedMovies,
  selectSelectedMoviesCount,
} from '../../store/selectedMoviesSelectors';
import { exportMoviesCsv } from '@/app/[locale]/actions/exportMovies';

export function SelectedMoviesFlyout() {
  const t = useTranslations('Flyout');
  const dispatch = useAppDispatch();
  const movies = useAppSelector(selectSelectedMovies);
  const count = useAppSelector(selectSelectedMoviesCount);

  if (count === 0) return null;

  return (
    <div
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[70%]
      bg-(--flyout-bg) border rounded-lg shadow-(--header-shadow)
      p-8 flex flex-col items-center gap-3 z-50"
    >
      <p className="text-lg text-(--text-color) font-medium text-center">
        {t('selected')} <span className="font-bold">{count}</span>
      </p>

      <div className="flex gap-3">
        <Button
          className="px-4 py-2 bg-(--button-bg) text-white rounded hover:bg-(--btn-hover-bg) transition"
          onClick={() => dispatch(unselectAllMovies())}
        >
          {t('unselect')}
        </Button>

        <form action={exportMoviesCsv}>
          <input type="hidden" name="movies" value={JSON.stringify(movies)} />
          <Button
            type="submit"
            className="px-4 py-2 bg-(--button-bg) text-white rounded-lg hover:bg-(--btn-hover-bg) transition"
          >
            {t('download')}
          </Button>
        </form>
      </div>
    </div>
  );
}
