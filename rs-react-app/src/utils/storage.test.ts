import { storage } from './storage';

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns null when no search term is stored', () => {
    expect(storage.getSearch()).toBeNull();
  });

  it('stores and retrieves search term', () => {
    storage.setSearch('Harry Potter');
    expect(storage.getSearch()).toBe('Harry Potter');
  });

  it('returns 1 when no page is stored', () => {
    expect(storage.getPage()).toBe(1);
  });

  it('stores and retrieves page number', () => {
    storage.setPage(5);
    expect(storage.getPage()).toBe(5);
  });
});
