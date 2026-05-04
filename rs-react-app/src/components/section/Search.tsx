import { Component } from 'react';
import Input from '../Input';
import Button from '../Button';

interface Props {
  onSearch: (value: string) => void;
  initialValue: string;
}

interface State {
  value: string;
}

class SearchSection extends Component<Props, State> {
  state: State = {
    value: this.props.initialValue || '',
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.initialValue !== this.props.initialValue) {
      this.setState({ value: this.props.initialValue });
    }
  }

  render() {
    return (
      <section className="w-full max-w-2xl mt-10 bg-white p-6 rounded-2xl shadow-md border">
        <form
          className="flex gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            this.props.onSearch(this.state.value);
          }}
        >
          <Input
            placeholder="Search movies by title"
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
