'use client';

import { ReactElement } from 'react';
import { useSearchParams } from 'next/navigation';
import MovieDetailSection from '@/components/movies/MovieDetailSection';

function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  const params = useSearchParams();
  const details = params?.get('details');
  const isDetailOpen = Boolean(details);

  return (
    <>
      <div
        className={
          isDetailOpen
            ? 'flex w-full gap-1 px-8 md:flex-row flex-col'
            : 'flex w-full justify-center'
        }
      >
        <div
          className={
            isDetailOpen
              ? 'md:w-[50%] w-full relative'
              : 'w-full max-w-2xl relative'
          }
        >
          {children}
        </div>

        {isDetailOpen && (
          <div className="hidden md:flex w-[50%] pl-2 pt-30 justify-center sticky top-0 h-fit">
            <MovieDetailSection />
          </div>
        )}
      </div>

      {isDetailOpen && (
        <div className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] flex justify-center items-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-xl shadow-xl flex justify-center overflow-auto max-h-[90vh] p-4">
            <MovieDetailSection />
          </div>
        </div>
      )}
    </>
  );
}

export default MoviesLayout;
