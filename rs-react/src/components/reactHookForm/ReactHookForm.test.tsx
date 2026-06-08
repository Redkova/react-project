import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ReactHookForm } from './ReactHookForm';
import { useDispatch, useSelector } from 'react-redux';
import { fileToBase64 } from '../../utils/fileToBase64';
import type { UseFormRegister } from 'react-hook-form';
import type { FormValues } from '../../validation/validationSchema';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('../../utils/fileToBase64', () => ({
  fileToBase64: vi.fn(),
}));

vi.mock('../autocomplete/Autocomplete', () => ({
  Autocomplete: ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
  }) => (
    <div>
      <label htmlFor='country'>{label}</label>
      <input
        id='country'
        name='country'
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  ),
}));

vi.mock('../password/reactHookForm/PasswordFieldRHF', () => ({
  PasswordFieldRHF: ({
    register,
  }: {
    register: UseFormRegister<FormValues>;
    passwordValue: string;
  }) => (
    <div>
      <label htmlFor='password'>Password</label>
      <input id='password' type='password' {...register('password')} />
    </div>
  ),
}));

vi.mock('../password/reactHookForm/ConfirmPasswordRHF', () => ({
  ConfirmPasswordRHF: ({
    register,
  }: {
    register: UseFormRegister<FormValues>;
    passwordValue: string;
    confirmValue: string;
  }) => (
    <div>
      <label htmlFor='confirmPassword'>Confirm Password</label>
      <input
        id='confirmPassword'
        type='password'
        {...register('confirmPassword')}
      />
    </div>
  ),
}));

describe('ReactHookForm', () => {
  const dispatchMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useDispatch).mockReturnValue(dispatchMock);
    vi.mocked(useSelector).mockReturnValue(['Sweden', 'Germany']);
    vi.mocked(fileToBase64).mockResolvedValue('base64-image');
  });

  it('renders all fields', () => {
    render(<ReactHookForm />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender')).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByLabelText('Choose file')).toBeInTheDocument();
  });

  it('shows validation errors on empty submit', async () => {
    render(<ReactHookForm />);

    const button = screen.getByRole('button', { name: /submit/i });
    button.removeAttribute('disabled');

    fireEvent.click(button);

    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(await screen.findByText('Age is required')).toBeInTheDocument();
    expect(await screen.findByText('Email is required')).toBeInTheDocument();
    expect(await screen.findByText('Gender is required')).toBeInTheDocument();
    expect(
      await screen.findByText(
        'Invalid input: expected string, received undefined'
      )
    ).toBeInTheDocument();
    expect(await screen.findByText('Password is required')).toBeInTheDocument();
    expect(
      await screen.findByText('Confirm password is required')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('You must accept terms')
    ).toBeInTheDocument();
    expect(await screen.findByText('Image is required')).toBeInTheDocument();
  });

  it('shows selected file name', async () => {
    render(<ReactHookForm />);

    const input = screen.getByLabelText('Choose file') as HTMLInputElement;
    const file = new File(['image'], 'avatar.png', { type: 'image/png' });

    fireEvent.change(input, { target: { files: [file] } });

    expect(await screen.findByText('Selected: avatar.png')).toBeInTheDocument();
  });

  it('updates country via Autocomplete', () => {
    render(<ReactHookForm />);

    const countryInput = screen.getByLabelText('Country');

    fireEvent.change(countryInput, { target: { value: 'Germany' } });

    expect(countryInput).toHaveValue('Germany');
  });

  it('shows error when passwords do not match', async () => {
    render(<ReactHookForm />);

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText('Age'), { target: { value: '30' } });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@mail.com' },
    });
    fireEvent.change(screen.getByLabelText('Gender'), {
      target: { value: 'male' },
    });
    fireEvent.change(screen.getByLabelText('Country'), {
      target: { value: 'Sweden' },
    });

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'Aa1!' },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: 'Bb2@' },
    });

    fireEvent.click(screen.getByRole('checkbox'));

    const button = screen.getByRole('button', { name: /submit/i });
    button.removeAttribute('disabled');
    fireEvent.click(button);

    expect(await screen.findByText('Passwords must match')).toBeInTheDocument();
  });

  it('disables submit until form becomes valid', async () => {
    render(<ReactHookForm />);

    const button = screen.getByRole('button', { name: /submit/i });

    expect(button).toBeDisabled();

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'John' },
    });
    expect(button).toBeDisabled();

    fireEvent.change(screen.getByLabelText('Age'), { target: { value: '30' } });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@mail.com' },
    });
    fireEvent.change(screen.getByLabelText('Gender'), {
      target: { value: 'male' },
    });
    fireEvent.change(screen.getByLabelText('Country'), {
      target: { value: 'Sweden' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'Aa1!' },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: 'Aa1!' },
    });
    fireEvent.click(screen.getByRole('checkbox'));

    expect(button).toBeDisabled();
  });

  it('shows email format error when email is invalid', async () => {
    render(<ReactHookForm />);

    const emailInput = screen.getByLabelText('Email');

    fireEvent.change(emailInput, { target: { value: 'wrong-email' } });

    const button = screen.getByRole('button', { name: /submit/i });
    button.removeAttribute('disabled');
    fireEvent.click(button);

    expect(await screen.findByText('Email must contain @')).toBeInTheDocument();
  });

  it('updates gender select correctly', () => {
    render(<ReactHookForm />);

    const genderSelect = screen.getByLabelText('Gender');

    expect(genderSelect).toHaveValue('');

    fireEvent.change(genderSelect, { target: { value: 'female' } });

    expect(genderSelect).toHaveValue('female');
  });

  it('shows error when email has no dot in domain', async () => {
    render(<ReactHookForm />);

    const emailInput = screen.getByLabelText('Email');

    fireEvent.change(emailInput, { target: { value: 'john@mail' } });

    const button = screen.getByRole('button', { name: /submit/i });
    button.removeAttribute('disabled');
    fireEvent.click(button);

    expect(await screen.findByText('Invalid email format')).toBeInTheDocument();
  });

  it('updates fileName when file is selected', async () => {
    render(<ReactHookForm />);

    const fileInput = screen.getByLabelText('Choose file') as HTMLInputElement;
    const file = new File(['hello'], 'photo.jpg', { type: 'image/jpeg' });

    Object.defineProperty(fileInput, 'files', {
      value: [file],
    });

    fireEvent.change(fileInput);

    expect(await screen.findByText('Selected: photo.jpg')).toBeInTheDocument();
  });

  it('submit stays disabled when terms are unchecked', () => {
    render(<ReactHookForm />);

    const button = screen.getByRole('button', { name: /submit/i });
    const checkbox = screen.getByRole('checkbox');

    expect(button).toBeDisabled();

    fireEvent.click(checkbox);
    fireEvent.click(checkbox);

    expect(button).toBeDisabled();
  });
});
