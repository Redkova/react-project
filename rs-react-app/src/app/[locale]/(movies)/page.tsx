import SearchSection from '@/components/layout/search/SearchSection';
import ResultsSection from '@/components/layout/resultSection/ResultSection';
import type { OmdbMovie } from '@/api/types';

interface PageProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}

async function fetchMovies(search: string, page: string): Promise<OmdbMovie[]> {
  const res = await fetch(
    `${process.env.OMDB_API_URL}?apikey=${process.env.OMDB_API_KEY}&s=${search}&page=${page}`,
    { cache: 'no-store' }
  );

  const data = await res.json();
  return (data.Search as OmdbMovie[]) ?? [];
}

export default async function HomePage(props: PageProps) {
  const params = await props.searchParams;

  const search = params.search ?? 'star';
  const page = params.page ?? '1';

  const movies = await fetchMovies(search, page);

  return (
    <div className="flex w-full justify-center px-4">
      <div className="w-full max-w-2xl">
        <SearchSection />
        <ResultsSection movies={movies} search={search} page={Number(page)} />
      </div>
    </div>
  );
}
