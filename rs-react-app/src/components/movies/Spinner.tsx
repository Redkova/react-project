import { Component, type ReactNode } from 'react';

class Spinner extends Component {
  render(): ReactNode {
    return (
      <div data-testid="spinner" className="flex justify-center py-10">
        <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
}

export default Spinner;
