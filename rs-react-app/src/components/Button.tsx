import { Component } from 'react';

class Button extends Component<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  render() {
    const { children, ...props } = this.props;

    return (
      <button
        {...props}
        className="px-5 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
      >
        {children}
      </button>
    );
  }
}

export default Button;
