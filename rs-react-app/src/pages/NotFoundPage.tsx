import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <div className="w-full max-w-lg bg-white py-10 px-6 rounded-xl shadow-lg mx-auto text-center ">
      <h1 className="text-3xl font-bold mb-6">Oops! Page not found</h1>
      <Link
        to="/"
        className="
          inline-block 
          px-6 py-3 
          bg-blue-600 
          text-white 
          rounded-lg 
          shadow-md 
          hover:bg-blue-700 
          hover:shadow-lg 
          transition-all
        "
      >
        Back to main
      </Link>
    </div>
  );
}
