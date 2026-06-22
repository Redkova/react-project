import { NextResponse } from 'next/server';
import type { OmdbMovie } from '@/api/types';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const moviesJson = searchParams.get('movies') ?? '[]';
  const movies = JSON.parse(moviesJson) as OmdbMovie[];

  const header = 'Title,Year,imdbID,Type,Poster\n';

  const rows = movies
    .map((m) => `${m.Title},${m.Year},${m.imdbID},${m.Type},${m.Poster}`)
    .join('\n');

  const csv = header + rows;

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename=${movies.length}_items.csv`,
    },
  });
}
