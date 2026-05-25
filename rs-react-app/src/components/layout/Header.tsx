import { Link } from 'react-router';
import { useMovieParams } from '../../hooks/useMovieParams';
import { useTheme } from '../../context/ThemeContext';

function Header() {
  const { theme, toggleTheme } = useTheme();
  const { search, page } = useMovieParams();
  return (
    <header className="w-full bg-(--bg) shadow-(--header-shadow)">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <button
          onClick={toggleTheme}
          className="w-12 h-6 rounded-full bg-(--card-bg) border relative transition cursor-pointer"
        >
          <span
            className={`absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-(--button-bg) transition ${
              theme === 'light' ? 'left-0.5' : 'left-6'
            }`}
          />
        </button>
        <Link
          to={`/?search=${search}&page=${page}`}
          className="text-xl font-bold text-center flex-1 transition 
            hover:scale-[1.2] 
            hover:text-blue-600"
        >
          <h1>Find Your Movie</h1>
        </Link>

        <nav className="w-24 text-right">
          <Link
            to="/about"
            className=" 
              hover:text-(--header-text-hover)
              transition"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
