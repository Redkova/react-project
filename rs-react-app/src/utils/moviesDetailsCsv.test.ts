import { describe, it, expect } from 'vitest';
import { generateMovieDetailsCsv } from './moviesDetailsCsv';
import type { OmdbMovieDetails } from '../api/types';

const movie: OmdbMovieDetails = {
  Title: 'Matrix',
  Year: '1999',
  imdbID: 'tt123',
  Poster: 'poster.jpg',
  Genre: 'Action',
  Country: 'USA',
  imdbRating: '8.7',
  Actors: 'Keanu Reeves',
  Plot: 'Some plot',
  Response: 'True',
};

describe('generateMovieDetailsCsv', () => {
  it('generates CSV with header and one row', () => {
    const csv = generateMovieDetailsCsv([movie]);

    const lines = csv.split('\n');

    expect(lines[0]).toBe(
      'Title,Year,Genre,Country,Actors,imdbRating,Poster,DetailsURL'
    );

    expect(lines[1]).toBe(
      'Matrix,1999,Action,USA,Keanu Reeves,8.7,poster.jpg,/?details=tt123'
    );
  });

  it('escapes quotes correctly', () => {
    const movieWithQuotes: OmdbMovieDetails = {
      ...movie,
      Title: 'He said "Hello"',
    };

    const csv = generateMovieDetailsCsv([movieWithQuotes]);
    const row = csv.split('\n')[1];

    expect(row.startsWith('"He said ""Hello"""')).toBe(true);
  });

  it('wraps values with commas in quotes', () => {
    const movieWithComma: OmdbMovieDetails = {
      ...movie,
      Genre: 'Action, Sci-Fi',
    };

    const csv = generateMovieDetailsCsv([movieWithComma]);
    const row = csv.split('\n')[1];

    expect(row).toContain('"Action, Sci-Fi"');
  });
});
