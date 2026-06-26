'use client';

import { useTranslations } from 'next-intl';
import { ReactElement, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PosterImage } from '@/components/ui/PosterImage';
import MovieError from '@/components/movies/MoviesError';
import Button from '@/components/ui/Button';
import type { OmdbMovieDetails } from '@/api/types';

interface Props {
  movie: OmdbMovieDetails | null;
}

export default function MovieDetailSection({ movie }: Props): ReactElement {
  const t = useTranslations('Movie');
  const router = useRouter();
  const searchParams = useSearchParams()!;

  const id = searchParams.get('details');
  const page = searchParams?.get('page') ?? '1';
  const search = searchParams?.get('search') ?? '';

  const [expanded, setExpanded] = useState(false);

  function closeDetails(): void {
    router.push(`?search=${search}&page=${page}`);
  }

  function refreshDetails(): void {
    router.refresh();
  }

  if (!id || !/^tt\d+$/.test(id)) {
    return <MovieError message="MovieNotFound" />;
  }

  if (!movie) {
    return <MovieError message="MovieNotFound" />;
  }

  const isLong = movie.Plot.length > 700;
  const shortPlot = isLong ? movie.Plot.slice(0, 700) + '...' : movie.Plot;

  return (
    <div className="relative w-full max-w-lg bg-(--movie-card-bg) py-6 px-4 rounded-xl shadow-(--card-border-shadow)">
      <button
        onClick={closeDetails}
        className="absolute top-2 right-3 text-gray-500 text-2xl leading-none cursor-default md:cursor-pointer md:hover:text-red-500"
      >
        ✕
      </button>

      <div className="flex gap-4">
        <PosterImage
          src={movie.Poster}
          alt={movie.Title}
          className="w-28 h-40"
        />

        <div className="flex flex-col justify-start gap-1">
          <h2 className="text-2xl font-bold">{movie.Title}</h2>
          <p className="text-(--text-color)">
            <strong className="text-(--text-color-secondary)">
              {t('year')}:
            </strong>{' '}
            {movie.Year}
          </p>
          <p className="text-(--text-color)">
            <strong className="text-(--text-color-secondary)">
              {t('genre')}:
            </strong>{' '}
            {movie.Genre}
          </p>
          <p className="text-(--text-color)">
            <strong className="text-(--text-color-secondary)">
              {t('country')}:
            </strong>{' '}
            {movie.Country}
          </p>
          <p className="text-(--text-color) flex items-center gap-1">
            <strong className="text-(--text-color-secondary)">
              {t('rating')}:
            </strong>
            <span className="text-yellow-500 text-lg">★</span>
            {movie.imdbRating}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-(--text-color)">
          <strong className="text-(--text-color-secondary)">
            {t('actors')}:
          </strong>{' '}
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
            {expanded ? t('showLess') : t('showMore')}
          </button>
        )}
      </p>

      <div className="flex justify-center items-center mt-4">
        <Button
          onClick={refreshDetails}
          className="bg-(--button-bg) text-white rounded-lg transition md:hover:bg-(--btn-hover-bg)"
        >
          {t('refresh')}
        </Button>
      </div>
    </div>
  );
}
