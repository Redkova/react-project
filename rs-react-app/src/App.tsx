import { Component } from 'react';
import MainLayout from './components/layout/Main';
import SearchSection from './components/section/Search';
import ResultsSection from './components/section/Result';
import { searchMovies } from './api/omdb';
import type { OmdbMovieShort } from './api/types';

interface State {
  results: OmdbMovieShort[];
  loading: boolean;
  error: string | null;
  search: string;
  page: number;
}

class HomePage extends Component<{}, State> {
  state: State = {
    results: [],
    loading: false,
    error: null,
    search: '',
    page: 1,
  };

  loadMovies = async () => {
    this.setState({ loading: true, error: null });

    try {
      const { search, page } = this.state;

      const data = await searchMovies(search, page);

      this.setState({
        results: data.movies,
        error: data.error ?? null,
      });
    } catch (error) {
      console.error(error);
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
    this.setState((prev) => ({ page: prev.page + 1 }), this.loadMovies);
  };

  prevPage = () => {
    this.setState(
      (prev) => ({ page: Math.max(prev.page - 1, 1) }),
      this.loadMovies
    );
  };

  render() {
    return (
      <MainLayout>
        <SearchSection onSearch={this.handleSearch} />

        <ResultsSection
          movies={this.state.results}
          loading={this.state.loading}
          error={this.state.error}
          onNext={this.nextPage}
          onPrev={this.prevPage}
          page={this.state.page}
        />
      </MainLayout>
    );
  }
}

export default HomePage;
