export async function getMovies(query: string, page: number) {
  const url = `${process.env.NEXT_PUBLIC_OMDB_API_URL}?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&s=${query}&page=${page}`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  const data = await res.json();
  return data.Search ?? [];
}

export async function getMovieDetails(id: string) {
  const url = `${process.env.NEXT_PUBLIC_OMDB_API_URL}?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&i=${id}&plot=short`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  return res.json();
}
