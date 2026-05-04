import { Component } from 'react';
import { searchMovies } from '../../api/omdb';
import type { OmdbMovieShort } from '../../api/types';
import SearchSection from './Search';
import ResultsSection from './Result';

interface State {
  results: OmdbMovieShort[];
  loading: boolean;
  error: string | null;
  search: string;
  page: number;
}

class MovieContainer extends Component<Record<string, never>, State> {
  state: State = {
    results: [],
    loading: false,
    error: null,
    search: '',
    page: 1,
  };

  componentDidMount() {
    const savedSearch = localStorage.getItem('searchTerm');
    const savedPage = localStorage.getItem('page');

    if (savedSearch) {
      this.setState(
        {
          search: savedSearch,
          page: savedPage ? Number(savedPage) : 1,
        },
        this.loadMovies
      );
      return;
    }

    this.loadMoviesWithDefault();
  }

  loadMoviesWithDefault = async () => {
    this.setState({ loading: true, error: null });

    try {
      const data = await searchMovies('star', 1);

      this.setState({
        results: data.movies,
        error: data.error ?? null,
        page: 1,
      });
    } catch {
      this.setState({ error: 'Failed to load data' });
    } finally {
      this.setState({ loading: false });
    }
  };

  loadMovies = async () => {
    this.setState({ loading: true, error: null });

    try {
      const { search, page } = this.state;
      const data = await searchMovies(search, page);

      if (data.error === 'Too many results.') {
        this.setState({
          results: [],
          error: 'No movies found with this title.',
        });
        return;
      }

      this.setState({
        results: data.movies,
        error: data.error ?? null,
      });
    } catch {
      this.setState({ error: 'Failed to load data' });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSearch = (value: string) => {
    if (value.length < 3) {
      this.setState({ error: 'Please enter at least 3 characters' });
      return;
    }

    localStorage.setItem('searchTerm', value);
    localStorage.setItem('page', '1');

    this.setState(
      {
        search: value,
        page: 1,
        error: null,
      },
      this.loadMovies
    );
  };

  nextPage = () => {
    this.setState((prev) => {
      const newPage = prev.page + 1;
      localStorage.setItem('page', String(newPage));
      return { page: newPage };
    }, this.loadMovies);
  };

  prevPage = () => {
    this.setState((prev) => {
      const newPage = Math.max(prev.page - 1, 1);
      localStorage.setItem('page', String(newPage));
      return { page: newPage };
    }, this.loadMovies);
  };

  render() {
    const { results, loading, error, search, page } = this.state;

    return (
      <>
        <SearchSection onSearch={this.handleSearch} initialValue={search} />

        <ResultsSection
          movies={results}
          loading={loading}
          error={error}
          onNext={this.nextPage}
          onPrev={this.prevPage}
          page={page}
        />
      </>
    );
  }
}

export default MovieContainer;
