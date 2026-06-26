import { getMovies, getMovieDetails } from '@/server/movies';
import SearchSection from '@/components/layout/search/SearchSection';
import ResultsSection from '@/components/layout/resultSection/ResultSection';
import MovieDetailSection from '@/components/movies/MovieDetailSection';

interface PageProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
    details?: string;
  }>;
}

export default async function MoviesPage(props: PageProps) {
  const params = await props.searchParams;
  const search = params.search ?? 'star';
  const page = Number(params.page ?? '1');
  const details = params.details ?? null;
  const movies = await getMovies(search, page);

  let movieDetails = null;
  if (details) {
    const data = await getMovieDetails(details);
    movieDetails = data.Response === 'True' ? data : null;
  }

  return (
    <div className="flex w-full justify-center px-4 gap-4">
      <div className="w-full max-w-2xl">
        <SearchSection />
        <ResultsSection movies={movies} search={search} page={page} />
      </div>

      {details && (
        <div className="hidden md:flex w-[50%] pl-2 pt-30 justify-center sticky top-0 h-fit">
          <MovieDetailSection movie={movieDetails} />
        </div>
      )}
    </div>
  );
}
