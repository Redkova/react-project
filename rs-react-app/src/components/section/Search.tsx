import { Component } from 'react';
import Input from '../Input';
import Button from '../Button';

interface Props {
  onSearch: (value: string) => void;
}

interface State {
  value: string;
}

class SearchSection extends Component<Props, State> {
  state: State = {
    value: '',
  };

  render() {
    return (
      <section className="w-full max-w-2xl mt-10 bg-white p-6 rounded-2xl shadow-md border">
        <h2 className="text-xl font-semibold mb-4 text-center">Search</h2>

        <form
          className="flex gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            this.props.onSearch(this.state.value);
          }}
        >
          <Input
            placeholder="Type something"
            value={this.state.value}
            onChange={(e) => this.setState({ value: e.target.value })}
          />
          <Button type="submit">Search</Button>
        </form>
      </section>
    );
  }
}

export default SearchSection;
