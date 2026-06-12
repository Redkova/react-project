import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UncontrolledForm } from './UncontrolledForm';
import { useDispatch, useSelector } from 'react-redux';
import { useInputFields } from '../../hooks/useInputFields';
import { getUserData } from '../../utils/getUserData';
import { fileToBase64 } from '../../utils/fileToBase64';
import { formSchema } from '../../validation/validationSchema';
import { ZodError } from 'zod';
import { type FormValuesData } from '../../validation/validationSchema';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('../../hooks/useInputFields', () => ({
  useInputFields: vi.fn(),
}));

vi.mock('../../utils/getUserData', () => ({
  getUserData: vi.fn(),
}));

vi.mock('../../utils/fileToBase64', () => ({
  fileToBase64: vi.fn(),
}));

vi.mock('../../validation/validationSchema', () => ({
  formSchema: {
    safeParse: vi.fn(),
  },
}));

vi.mock('../autocomplete/Autocomplete', () => ({
  Autocomplete: ({ label }: { label: string }) => <div>{label}</div>,
}));

vi.mock('../password/uncontrolledForm/PasswordFieldUncontrolled', () => ({
  PasswordFieldUncontrolled: () => <div>Password field</div>,
}));

vi.mock('../password/uncontrolledForm/ConfirmPasswordUncontrolled', () => ({
  ConfirmPasswordUncontrolled: () => <div>Confirm password field</div>,
}));

describe('UncontrolledForm', () => {
  const dispatchMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useDispatch).mockReturnValue(dispatchMock);
    vi.mocked(useSelector).mockReturnValue(['Sweden', 'Germany']);

    vi.mocked(useInputFields).mockReturnValue({
      refs: {
        name: { current: document.createElement('input') },
        age: { current: document.createElement('input') },
        email: { current: document.createElement('input') },
        country: { current: document.createElement('input') },
        password: { current: document.createElement('input') },
        confirmPassword: { current: document.createElement('input') },
        gender: { current: document.createElement('select') },
        terms: { current: document.createElement('input') },
      },

      fileRef: { current: null },
    });

    vi.mocked(getUserData).mockReturnValue({
      name: 'John',
      age: '30',
      email: 'john@mail.com',
      gender: 'male',
      terms: true,
      country: 'Sweden',
      password: '123456',
      confirmPassword: '123456',
    });

    vi.mocked(fileToBase64).mockResolvedValue('base64-image');
  });

  const mockSuccessValidation = () =>
    vi.mocked(formSchema.safeParse).mockReturnValue({
      success: true,
      data: {
        name: 'John',
        age: '30',
        email: 'john@mail.com',
        gender: 'male',
        terms: true,
        country: 'Sweden',
        password: '123456',
        confirmPassword: '123456',
        file: [] as unknown as FileList,
      },
    } as ReturnType<typeof formSchema.safeParse>);

  const mockErrorValidation = () => {
    const err = new ZodError([
      {
        code: 'custom',
        message: 'Name required',
        path: ['name'],
      },
    ]) as ZodError<FormValuesData>;

    vi.mocked(formSchema.safeParse).mockReturnValue({
      success: false,
      error: err,
    });
  };

  it('renders form fields', () => {
    mockSuccessValidation();

    render(<UncontrolledForm />);

    expect(screen.getByText('Upload Image')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('shows validation errors', async () => {
    mockErrorValidation();

    render(<UncontrolledForm />);

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText('Name required')).toBeInTheDocument();
    expect(dispatchMock).not.toHaveBeenCalled();
  });

  it('submits form successfully', async () => {
    const onSuccess = vi.fn();
    mockSuccessValidation();

    render(<UncontrolledForm onSuccess={onSuccess} />);

    const input = screen.getByLabelText('Choose file') as HTMLInputElement;

    const file = new File(['image'], 'photo.png', { type: 'image/png' });

    fireEvent.change(input, { target: { files: [file] } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(fileToBase64).toHaveBeenCalledWith(file);
      expect(dispatchMock).toHaveBeenCalledTimes(1);
      expect(onSuccess).toHaveBeenCalledTimes(1);
    });
  });

  it('shows selected file name', async () => {
    mockSuccessValidation();

    render(<UncontrolledForm />);

    const input = screen.getByLabelText('Choose file') as HTMLInputElement;

    const file = new File(['image'], 'avatar.png', { type: 'image/png' });

    fireEvent.change(input, { target: { files: [file] } });

    expect(await screen.findByText('Selected: avatar.png')).toBeInTheDocument();
  });

  it('does not call fileToBase64 without file', async () => {
    mockSuccessValidation();

    render(<UncontrolledForm />);

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(fileToBase64).not.toHaveBeenCalled();
    });
  });
});
