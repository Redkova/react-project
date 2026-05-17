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
  Title: string;
  Year: string;
  Genre: string;
  Country: string;
  imdbID: string;
  Poster: string;
  Actors: string;
  Plot: string;
  imdbRating: string;
  Response: 'True' | 'False';
  Error?: string;
}
