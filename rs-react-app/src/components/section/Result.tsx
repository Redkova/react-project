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
  state = {
    forceError: false,
  };

  render() {
    if (this.state.forceError) {
      throw new Error('Simulated render error');
    }

    const { movies, loading, error, onNext, onPrev, page } = this.props;

    return (
      <section className="w-full max-w-2xl mt-6 mb-10 bg-white p-6 rounded-2xl shadow-md border flex flex-col">
        <div className="flex-1">
          <div className="flex justify-between items-center px-2 pb-3 border-b mb-4">
            <span className="text-gray-600 font-semibold pl-2">Movie name</span>
            <span className="text-gray-600 font-semibold pr-2">Year</span>
          </div>

          {loading && (
            <div className="flex justify-center py-10">
              <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {error && (
            <p className="mt-4 text-sm text-red-700 bg-red-100 border border-red-300 px-4 py-2 rounded-md text-center">
              {error}
            </p>
          )}

          {!loading && !error && movies.length === 0 && (
            <p className="text-center text-gray-500">No results found</p>
          )}

          {!loading && !error && movies.length > 0 && (
            <div className="space-y-4">
              {movies.map((m) => {
                const hasPoster =
                  m.Poster && m.Poster !== 'N/A' && m.Poster !== '';

                return (
                  <div
                    key={m.imdbID}
                    className="flex justify-between items-center p-4 border rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-4">
                      {hasPoster && (
                        <img
                          src={m.Poster}
                          alt={m.Title}
                          className="w-14 h-20 object-cover rounded-md border"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      )}

                      <h3 className="text-lg font-semibold">{m.Title}</h3>
                    </div>

                    <p className="text-gray-700 text-lg font-medium">
                      {m.Year}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {!loading && !error && movies.length > 0 && (
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={onPrev}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                Prev
              </button>

              <span className="font-semibold">Page {page}</span>

              <button
                onClick={onNext}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                Next
              </button>
            </div>
          )}
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => this.setState({ forceError: true })}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Simulate Error
          </button>
        </div>
      </section>
    );
  }
}

export default ResultsSection;
