export function AboutPage() {
  return (
    <div className="w-full max-w-lg py-6 px-4 rounded-xl bg-white shadow-sm hover:shadow-md">
      <p className="text-lg mb-4 leading-relaxed">
        This application was developed by <strong>Alexandra Redkova</strong> as
        part of the RS School React Course.
      </p>

      <p className="text-lg mb-6 leading-relaxed">
        The project demonstrates React fundamentals, routing, API integration,
        testing, and modern UI/UX practices.
      </p>

      <div className="border-t pt-6 flex flex-col gap-3 text-center">
        <a
          href="https://github.com/Redkova"
          target="_blank"
          rel="noopener noreferrer"
          className="
            text-blue-600 
            hover:text-blue-700 
            transition 
            hover:underline
          "
        >
          GitHub
        </a>

        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
          className="
            text-blue-600 
            hover:text-blue-700 
            transition 
            hover:underline
          "
        >
          RS School
        </a>
      </div>
    </div>
  );
}
