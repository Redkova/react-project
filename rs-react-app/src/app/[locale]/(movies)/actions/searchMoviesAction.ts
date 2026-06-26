'use server';

import { redirect } from 'next/navigation';

export async function searchMoviesAction(formData: FormData) {
  const search = (formData.get('search') as string)?.trim();

  if (!search || search.length === 0) {
    redirect(`?search=star&page=1`);
  }

  redirect(`?search=${encodeURIComponent(search)}&page=1`);
}
