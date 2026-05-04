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
