import MoviesLayoutClient from './MoviesLayoutClient';

export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MoviesLayoutClient>{children}</MoviesLayoutClient>;
}
