type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, className = '', disabled, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={`px-5 py-2 rounded-xl transition
        ${className} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        ${disabled ? '' : 'hover:bg-blue-600'}`}
    >
      {children}
    </button>
  );
}

export default Button;
