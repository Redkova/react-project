import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchSection from './SearchSection';

describe('SearchSection', () => {
  it('renders input and button', () => {
    render(<SearchSection initialValue="" onSearch={() => {}} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('renders initialValue in input', () => {
    render(<SearchSection initialValue="Harry Potter" onSearch={() => {}} />);
    expect(screen.getByRole('textbox')).toHaveValue('Harry Potter');
  });

  it('renders empty input when initialValue is empty', () => {
    render(<SearchSection initialValue="" onSearch={() => {}} />);
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('updates input value when user types', async () => {
    const user = userEvent.setup();
    render(<SearchSection initialValue="" onSearch={() => {}} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'Avatar');
    expect(input).toHaveValue('Avatar');
  });

  it('calls onSearch with entered value after form submit', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<SearchSection initialValue="" onSearch={onSearch} />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'Matrix');
    await user.click(screen.getByRole('button', { name: 'Search' }));
    expect(onSearch).toHaveBeenCalledWith('Matrix');
  });
});
