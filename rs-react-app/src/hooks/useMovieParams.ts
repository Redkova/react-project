import { useSearchParams } from 'react-router';

export function useMovieParams() {
  const [params, setParams] = useSearchParams();

  const search = params.get('search') || '';
  const pageParam = params.get('page');
  const page = pageParam ? Number(pageParam) : 1;
  const details = params.get('details');

  function updateParams(newValues: Record<string, string | null>) {
    const updated = new URLSearchParams(params);

    Object.entries(newValues).forEach(([key, value]) => {
      if (value === null) updated.delete(key);
      else updated.set(key, value);
    });

    setParams(updated);
  }

  return {
    search,
    page,
    details,
    updateParams,
  };
}
