import { Link } from 'react-router';

function Header() {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="w-24" />
        <Link
          to="/"
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
              hover:text-blue-600
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
