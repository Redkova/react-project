import { Component, type ReactNode } from 'react';

interface Props {
  message: string;
}

class MovieError extends Component<Props> {
  render(): ReactNode {
    return (
      <p className="mt-4 text-sm text-red-700 bg-red-100 border border-red-300 px-4 py-2 rounded-md text-center">
        {this.props.message}
      </p>
    );
  }
}

export default MovieError;
