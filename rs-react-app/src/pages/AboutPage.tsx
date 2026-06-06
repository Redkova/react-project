import { Link } from 'react-router';

export function AboutPage() {
  return (
    <div className="w-full max-w-lg py-6 px-4 rounded-xl bg-(--bg) shadow-(--card-border-shadow)">
      <p className="text-(--text-color) text-lg mb-4 leading-relaxed">
        This application was developed by <strong>Alexandra Redkova</strong> as
        part of the RS School React Course.
      </p>

      <p className="text-(--text-color) text-lg mb-6 leading-relaxed">
        The project demonstrates React fundamentals, routing, API integration,
        testing, and modern UI/UX practices.
      </p>

      <div className="border-t pt-6 flex flex-col gap-3 text-center items-center">
        <a
          href="https://github.com/Redkova"
          target="_blank"
          rel="noopener noreferrer"
          className="
            text-(--link-text-color) 
            md:hover:text-blue-700 
            transition 
            md:hover:underline
            cursor-default
            md:cursor-pointer
          "
        >
          GitHub
        </a>

        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
          className="
            text-(--link-text-color) 
            md:hover:text-blue-700 
            transition 
            md:hover:underline
            cursor-default
            md:cursor-pointer
          "
        >
          RS School
        </a>
        <Link
          to="/"
          className="
          inline-block 
          px-6 py-3 
          bg-(--button-bg) 
          text-white 
          rounded-lg 
          shadow-md 
          md:hover:bg-(--btn-hover-bg) 
          md:hover:shadow-lg 
          transition-all
          cursor-default
          md:cursor-pointer
        "
        >
          Back to main
        </Link>
      </div>
    </div>
  );
}
