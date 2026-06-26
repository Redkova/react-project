'use server';

import { redirect } from 'next/navigation';

export async function exportMoviesCsv(formData: FormData) {
  const moviesJson = formData.get('movies') as string;

  redirect(`/api/export?movies=${encodeURIComponent(moviesJson)}`);
}
