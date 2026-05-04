const SEARCH_KEY = 'searchTerm';
const PAGE_KEY = 'page';

export const storage = {
  getSearch(): string | null {
    return localStorage.getItem(SEARCH_KEY);
  },

  setSearch(value: string) {
    localStorage.setItem(SEARCH_KEY, value);
  },

  getPage(): number {
    return Number(localStorage.getItem(PAGE_KEY) || 1);
  },

  setPage(page: number) {
    localStorage.setItem(PAGE_KEY, String(page));
  },
};
