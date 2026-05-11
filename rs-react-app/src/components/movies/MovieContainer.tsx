import { Component } from 'react';
import type { OmdbMovie } from '../../api/types';
import SearchSection from '../search/SearchSection';
import ResultsSection from './ResultSection';

import { storage } from '../../utils/storage';
import { fetchMovies } from '../../api/services/movieService';

interface State {
  results: OmdbMovie[];
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
    const savedSearch = storage.getSearch();
    const savedPage = storage.getPage();

    if (savedSearch) {
      this.setState(
        {
          search: savedSearch,
          page: savedPage,
        },
        this.loadMovies
      );
    } else {
      this.loadMovies('star', 1);
    }
  }

  loadMovies = async (search = this.state.search, page = this.state.page) => {
    this.setState({ loading: true, error: null });

    try {
      const { movies, error } = await fetchMovies(search, page);

      this.setState({
        results: movies,
        error,
      });
    } catch {
      this.setState({ error: 'Failed to load data' });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSearch = (value: string) => {
    const trimmed = value.trim();

    if (trimmed.length < 3) {
      this.setState({ error: 'Please enter at least 3 characters' });
      return;
    }

    if (trimmed === this.state.search) return;

    storage.setSearch(trimmed);
    storage.setPage(1);

    this.setState(
      {
        search: trimmed,
        page: 1,
        error: null,
      },
      () => this.loadMovies(trimmed, 1)
    );
  };

  nextPage = () => {
    const newPage = this.state.page + 1;

    storage.setPage(newPage);

    this.setState({ page: newPage }, () =>
      this.loadMovies(this.state.search, newPage)
    );
  };

  prevPage = () => {
    const newPage = Math.max(this.state.page - 1, 1);

    storage.setPage(newPage);

    this.setState({ page: newPage }, () =>
      this.loadMovies(this.state.search, newPage)
    );
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
