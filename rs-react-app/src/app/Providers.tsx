'use client';

import { Provider } from 'react-redux';
import { store } from '../store/store';
import { ThemeProvider } from '../context/ThemeProvider';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';
import { SelectedMoviesFlyout } from '../components/flyout/flyout';

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary>
          {children}
          <SelectedMoviesFlyout />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
}
