export interface OmdbMovieShort {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface OmdbSearchResponse {
  Search?: OmdbMovieShort[];
  totalResults?: string;
  Response: 'True' | 'False';
  Error?: string;
}

export interface MoviesResult {
  movies: OmdbMovieShort[];
  total: number;
  error?: string;
}
