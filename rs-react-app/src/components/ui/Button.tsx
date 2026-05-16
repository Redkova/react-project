type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, className = '', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`${className} px-5 py-2 bg-blue-500 rounded-xl hover:bg-blue-600 transition cursor-pointer `}
    >
      {children}
    </button>
  );
}

export default Button;
