import { Component } from 'react';

interface Props {}

interface State {}

class ResultsSection extends Component<Props, State> {
  render() {
    return (
      <section className="w-full max-w-2xl mt-6 mb-10 bg-white p-6 rounded-2xl shadow-md border flex-1">
        <h2 className="text-xl font-semibold mb-4 text-center">Results</h2>

        <div className="space-y-3">
          <div className="p-4 border rounded-xl bg-gray-50"></div>
        </div>
      </section>
    );
  }
}

export default ResultsSection;
