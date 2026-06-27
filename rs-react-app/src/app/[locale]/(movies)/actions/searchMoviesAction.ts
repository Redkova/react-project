'use server';

import { redirect } from 'next/navigation';

export async function searchMoviesAction(formData: FormData) {
  const search = (formData.get('search') as string)?.trim() || 'star';

  const locale = formData.get('locale') || 'en';

  redirect(`/${locale}?search=${encodeURIComponent(search)}&page=1`);
}
