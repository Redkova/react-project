import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConfirmPasswordUncontrolled } from './ConfirmPasswordUncontrolled';

describe('ConfirmPasswordUncontrolled', () => {
  let inputRef: React.RefObject<HTMLInputElement>;
  let passwordRef: React.RefObject<HTMLInputElement>;

  beforeEach(() => {
    inputRef = { current: null };
    passwordRef = { current: null };
  });

  const setup = (passwordValue: string) => {
    const fakePasswordInput = document.createElement('input');
    fakePasswordInput.value = passwordValue;
    passwordRef.current = fakePasswordInput;

    render(
      <ConfirmPasswordUncontrolled
        label='Confirm Password'
        inputRef={inputRef}
        passwordRef={passwordRef}
      />
    );
  };

  it('renders label and password input', () => {
    setup('');

    expect(screen.getByText('Confirm Password')).toBeInTheDocument();

    const input = screen.getByLabelText('Confirm Password', {
      selector: 'input',
    });
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'password');
  });

  it('shows error when passwords do not match', () => {
    setup('Secret123!');

    const input = screen.getByLabelText('Confirm Password', {
      selector: 'input',
    });

    fireEvent.change(input, { target: { value: 'WrongPass' } });

    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
  });

  it('hides error when passwords match', () => {
    setup('Secret123!');

    const input = screen.getByLabelText('Confirm Password', {
      selector: 'input',
    });

    fireEvent.change(input, { target: { value: 'Secret123!' } });

    expect(
      screen.queryByText('Passwords do not match')
    ).not.toBeInTheDocument();
  });

  it('does not show error before user types', () => {
    setup('Secret123!');

    expect(
      screen.queryByText('Passwords do not match')
    ).not.toBeInTheDocument();
  });

  it('inputRef receives the input element', () => {
    setup('');

    expect(inputRef.current).toBeInstanceOf(HTMLInputElement);
  });
});
