import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { SubmittedCard } from './SubmittedCard';
import { useDispatch } from 'react-redux';
import { markAsOld } from '../../store/submittedFormsSlice';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

vi.mock('../../store/submittedFormsSlice', () => ({
  markAsOld: vi.fn((id: string) => ({
    type: 'submittedForms/markAsOld',
    payload: id,
  })),
}));

describe('SubmittedCard', () => {
  const dispatchMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useDispatch).mockReturnValue(dispatchMock);
    vi.useFakeTimers();
  });

  const baseItem = {
    id: '123',
    formType: 'react hook',
    createdAt: '2024-01-01',
    data: {
      name: 'John',
      age: '25',
      email: 'john@mail.com',
      gender: 'male',
      country: 'Sweden',
      terms: true,
      password: 'Aa1!',
      fileBase64: undefined,
    },
  };

  it('renders form data correctly', () => {
    render(<SubmittedCard item={{ ...baseItem }} />);

    expect(screen.getByText(/react hook\s*form/i)).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('john@mail.com')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText('Sweden')).toBeInTheDocument();
    expect(screen.getByText('Accepted')).toBeInTheDocument();
    expect(screen.getByText('Aa1!')).toBeInTheDocument();
  });

  it('renders image when fileBase64 exists', () => {
    const itemWithImage = {
      ...baseItem,
      data: { ...baseItem.data, fileBase64: 'data:image/png;base64,AAA' },
    };

    render(<SubmittedCard item={itemWithImage} />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'data:image/png;base64,AAA');
  });

  it('dispatches markAsOld after 3 seconds when item is new', () => {
    render(<SubmittedCard item={{ ...baseItem, isNew: true }} />);

    expect(dispatchMock).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(markAsOld).toHaveBeenCalledWith('123');
  });

  it('clears timeout on unmount', () => {
    const { unmount } = render(
      <SubmittedCard item={{ ...baseItem, isNew: true }} />
    );

    unmount();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(dispatchMock).not.toHaveBeenCalled();
  });
});
