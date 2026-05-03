import { Component } from 'react';
import Input from '../Input';
import Button from '../Button';

interface Props {}

interface State {}

class SearchSection extends Component<Props, State> {
  render() {
    return (
      <section className="w-full max-w-2xl mt-10 bg-white p-6 rounded-2xl shadow-md border">
        <h2 className="text-xl font-semibold mb-4 text-center">Search</h2>

        <form className="flex gap-3">
          <Input placeholder="Type something" />
          <Button type="submit">Search</Button>
        </form>
      </section>
    );
  }
}

export default SearchSection;
