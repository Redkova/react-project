import { AppRouter } from './router/AppRouter';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { SelectedMoviesFlyout } from './components/flyout/flyout';

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
      <SelectedMoviesFlyout />
    </Provider>
  );
}
export default App;
