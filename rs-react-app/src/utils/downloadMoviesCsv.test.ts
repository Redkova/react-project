import { vi, describe, it, expect, beforeEach } from 'vitest';
import { downloadMoviesCsv } from './downloadMoviesCsv';
import { fetchMovieDetails } from '../api/omdb';
import { generateMovieDetailsCsv } from './moviesDetailsCsv';
import type { OmdbMovie, OmdbMovieDetails } from '../api/types';

vi.mock('../api/omdb', () => ({
  fetchMovieDetails: vi.fn(),
}));

vi.mock('./moviesDetailsCsv', () => ({
  generateMovieDetailsCsv: vi.fn(),
}));

const mockedFetch = vi.mocked(fetchMovieDetails);
const mockedCsv = vi.mocked(generateMovieDetailsCsv);

const movie: OmdbMovie = {
  Title: 'Matrix',
  Year: '1999',
  imdbID: '1',
  Poster: '',
  Type: 'movie',
};

const movieDetails: OmdbMovieDetails = {
  Title: 'Matrix',
  Year: '1999',
  imdbID: '1',
  Poster: 'poster.jpg',
  Genre: 'Action',
  Country: 'USA',
  imdbRating: '8.7',
  Actors: 'Keanu Reeves',
  Plot: 'Some plot',
  Response: 'True',
};

describe('downloadMoviesCsv', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockedFetch.mockResolvedValue(movieDetails);
    mockedCsv.mockReturnValue('csv-content');

    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:url');
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});

    vi.spyOn(document.body, 'appendChild').mockImplementation((node) => node);
    vi.spyOn(document.body, 'removeChild').mockImplementation((node) => node);

    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
  });

  it('fetches movie details for each movie', async () => {
    await downloadMoviesCsv([movie]);

    expect(mockedFetch).toHaveBeenCalledTimes(1);
    expect(mockedFetch).toHaveBeenCalledWith('1');
  });

  it('generates CSV from valid movie details', async () => {
    await downloadMoviesCsv([movie]);

    expect(mockedCsv).toHaveBeenCalledWith([movieDetails]);
  });

  it('creates blob URL and revokes it', async () => {
    const createSpy = vi.spyOn(URL, 'createObjectURL');
    const revokeSpy = vi.spyOn(URL, 'revokeObjectURL');

    await downloadMoviesCsv([movie]);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(revokeSpy).toHaveBeenCalledTimes(1);
  });
});
