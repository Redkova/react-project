import { Component } from 'react';
import MainLayout from './components/layout/Main';
import MovieContainer from './components/section/MovieContainer';

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
