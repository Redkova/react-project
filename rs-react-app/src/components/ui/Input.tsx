type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`flex-1 px-4 py-2 border border-(--border-color) rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
    />
  );
}

export default Input;
