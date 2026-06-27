'use client';

import { useTranslations } from 'next-intl';
import { ReactElement } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { OmdbMovie } from '../../api/types';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { toggleMovieSelection } from '@/store/selectedMoviesSlice';
import { Checkbox } from '../ui/Checkbox';
import { PosterImage } from '../ui/PosterImage';

interface Props {
  movie: OmdbMovie;
}

function MovieItem({ movie }: Props): ReactElement {
  const t = useTranslations('Movie');
  const router = useRouter();
  const params = useSearchParams();
  const dispatch = useAppDispatch();

  const search = params?.get('search') ?? 'star';
  const page = params?.get('page') ?? '1';

  const isSelected = useAppSelector((state) =>
    state.selectedMovies.movieItems.some((m) => m.imdbID === movie.imdbID)
  );

  function handleOpenDetails(): void {
    router.push(`?search=${search}&page=${page}&details=${movie.imdbID}`);
  }

  function handleCheckboxChange(): void {
    dispatch(toggleMovieSelection(movie));
  }

  return (
    <div
      onClick={handleOpenDetails}
      className="flex justify-between items-center p-4 border rounded-xl bg-(--movie-card-bg) shadow-(--card-border-shadow) md:hover:shadow-(--card-border-hover-shadow) transition cursor-default md:cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <Checkbox checked={isSelected} onChange={handleCheckboxChange} />

        <PosterImage
          src={movie.Poster}
          alt={`${movie.Title} ${t('year')} ${movie.Year}`}
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
