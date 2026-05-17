import { Routes, Route, Outlet, Navigate } from 'react-router';
import MainLayout from '../components/layout/Layout';
import { SearchPage } from '../pages/SearchPage';
import { MovieDetailSection } from '../pages/MovieDetailSection';
import { AboutPage } from '../pages/AboutPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { PagePath } from './paths';

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
        <Route index element={<SearchPage />} />
        <Route path={PagePath.item} element={<MovieDetailSection />} />
        <Route path={PagePath.about} element={<AboutPage />} />
        <Route path={PagePath.notFound} element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}
