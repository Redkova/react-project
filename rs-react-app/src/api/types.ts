export interface OmdbMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface OmdbMovieSearchResponse {
  Search?: OmdbMovie[];
  totalResults?: string;
  Response: 'True' | 'False';
  Error?: string;
}

export interface MoviesResult {
  movies: OmdbMovie[];
  total: number;
  error?: string;
}

export interface OmdbMovieDetails {
  Response: true;
  Title: string;
  Year: string;
  Genre: string;
  Country: string;
  imdbID: string;
  Poster: string;
  Actors: string;
  Plot: string;
  imdbRating: string;
}

export interface OmdbErrorResponse {
  Response: 'False';
  Error: string;
}

export type MovieDetailsResult = OmdbMovieDetails | OmdbErrorResponse;
