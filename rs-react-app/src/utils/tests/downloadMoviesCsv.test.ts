import { describe, it, expect, vi, beforeEach } from 'vitest';
import { downloadMoviesCsv } from '../downloadMoviesCsv';
import type { OmdbMovie, OmdbMovieDetails } from '../../api/types';
import { generateMovieDetailsCsv } from '../moviesDetailsCsv';
import { store } from '../../store/store';
import { movieApi } from '../../api/api';

vi.mock('../../store/store', () => ({
  store: {
    dispatch: vi.fn(),
  },
}));

vi.mock('../../api/api', () => ({
  movieApi: {
    endpoints: {
      getMovieDetails: {
        initiate: vi.fn(),
      },
    },
  },
}));

vi.mock('../moviesDetailsCsv', () => ({
  generateMovieDetailsCsv: vi.fn(),
}));

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

    vi.mocked(generateMovieDetailsCsv).mockReturnValue('csv-content');

    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:url');
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});

    vi.spyOn(document.body, 'appendChild').mockImplementation(
      (node: Node) => node
    );
    vi.spyOn(document.body, 'removeChild').mockImplementation(
      (node: Node) => node
    );

    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
  });

  it('fetches movie details for each movie via dispatch + unwrap', async () => {
    const dispatchMock = vi.mocked(store.dispatch);
    const initiateMock = vi.mocked(movieApi.endpoints.getMovieDetails.initiate);

    const thunk = vi.fn();

    dispatchMock.mockReturnValue({
      type: 'getMovieDetails/fulfilled',
      unwrap: vi.fn().mockResolvedValue(movieDetails),
    });

    initiateMock.mockReturnValue(thunk);

    await downloadMoviesCsv([movie]);

    expect(initiateMock).toHaveBeenCalledWith('1');
    expect(dispatchMock).toHaveBeenCalledWith(thunk);
  });

  it('generates CSV from valid movie details', async () => {
    const dispatchMock = vi.mocked(store.dispatch);
    const initiateMock = vi.mocked(movieApi.endpoints.getMovieDetails.initiate);

    const thunk = vi.fn();
    initiateMock.mockReturnValue(thunk);

    dispatchMock.mockReturnValue({
      type: 'getMovieDetails/fulfilled',
      unwrap: vi.fn().mockResolvedValue(movieDetails),
    });

    await downloadMoviesCsv([movie]);

    expect(generateMovieDetailsCsv).toHaveBeenCalledWith([movieDetails]);
  });

  it('creates blob URL and revokes it', async () => {
    const dispatchMock = vi.mocked(store.dispatch);
    const initiateMock = vi.mocked(movieApi.endpoints.getMovieDetails.initiate);

    const thunk = vi.fn();
    initiateMock.mockReturnValue(thunk);

    dispatchMock.mockReturnValue({
      type: 'getMovieDetails/fulfilled',
      unwrap: vi.fn().mockResolvedValue(movieDetails),
    });

    const createSpy = vi.spyOn(URL, 'createObjectURL');
    const revokeSpy = vi.spyOn(URL, 'revokeObjectURL');

    await downloadMoviesCsv([movie]);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(revokeSpy).toHaveBeenCalledTimes(1);
  });

  it('creates a downloadable link and triggers click', async () => {
    const dispatchMock = vi.mocked(store.dispatch);
    const initiateMock = vi.mocked(movieApi.endpoints.getMovieDetails.initiate);

    const thunk = vi.fn();
    initiateMock.mockReturnValue(thunk);

    dispatchMock.mockReturnValue({
      type: 'getMovieDetails/fulfilled',
      unwrap: vi.fn().mockResolvedValue(movieDetails),
    });

    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click');

    await downloadMoviesCsv([movie]);

    expect(clickSpy).toHaveBeenCalledTimes(1);
  });
});
