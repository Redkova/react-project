import { Component } from 'react';

class Input extends Component<React.InputHTMLAttributes<HTMLInputElement>> {
  render() {
    return (
      <input
        {...this.props}
        className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    );
  }
}

export default Input;
