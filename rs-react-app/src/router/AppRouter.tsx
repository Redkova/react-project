import { Routes, Route, Outlet, Navigate } from 'react-router';
import MainLayout from '../components/layout/Layout';
import { MovieDetailSection } from '../components/movies/MovieDetailSection';
import { AboutPage } from '../app/[locale]/about/page';
import { NotFoundPage } from '../app/[locale]/(movies)/not-found';
import { PagePath } from './paths';
import MovieContainer from '../pages/Main';

export function AppRouter() {
  return (
    <Routes>
      <Route
        path={PagePath.root}
        element={
          <MainLayout>
            <Outlet />
          </MainLayout>
        }
      >
        <Route path={PagePath.root} element={<MovieContainer />}>
          <Route index element={<MovieDetailSection />} />
        </Route>
        <Route path={PagePath.about} element={<AboutPage />} />
        <Route path={PagePath.notFound} element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}
