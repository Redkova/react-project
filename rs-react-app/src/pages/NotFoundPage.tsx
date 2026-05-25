import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <div className="w-full max-w-lg bg-(--card-bg) py-10 px-6 rounded-xl shadow-lg mx-auto text-center ">
      <h1 className="text-3xl font-bold mb-6">Oops! Page not found</h1>
      <Link
        to="/"
        className="
          inline-block 
          px-6 py-3 
          bg-(--button-bg) 
          text-white 
          rounded-lg 
          shadow-md 
          hover:bg-(--btn-hover-bg) 
          hover:shadow-lg 
          transition-all
        "
      >
        Back to main
      </Link>
    </div>
  );
}
