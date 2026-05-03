import { Component } from 'react';
import type { OmdbMovieShort } from '../../api/types';

interface Props {
  movies: OmdbMovieShort[];
  loading: boolean;
  error: string | null;
  onNext: () => void;
  onPrev: () => void;
  page: number;
}

class ResultsSection extends Component<Props> {
  render() {
    const { movies, loading, error, onNext, onPrev, page } = this.props;

    return (
      <section className="w-full max-w-2xl mt-6 mb-10 bg-white p-6 rounded-2xl shadow-md border flex-1">
        <h2 className="text-xl font-semibold mb-4 text-center">Results</h2>

        {loading && <p>Loading...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && (
          <>
            {movies.map((m) => (
              <div key={m.imdbID}>
                {m.Title} ({m.Year})
              </div>
            ))}

            <button onClick={onPrev}>Prev</button>
            <span>{page}</span>
            <button onClick={onNext}>Next</button>
          </>
        )}
      </section>
    );
  }
}

export default ResultsSection;
