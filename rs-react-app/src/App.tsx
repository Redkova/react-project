import { Component } from 'react';
import MainLayout from './components/layout/Layout';
import MovieContainer from './components/movies/MovieContainer';

class App extends Component {
  render() {
    return (
      <MainLayout>
        <MovieContainer />
      </MainLayout>
    );
  }
}

export default App;
