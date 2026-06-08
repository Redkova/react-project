import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HomePage } from './HomePage';
import { useSelector } from 'react-redux';

// ---- Моки компонентов ----
vi.mock('../components/Modal', () => ({
  Modal: ({
    isOpen,
    children,
    title,
  }: {
    isOpen: boolean;
    children: React.ReactNode;
    title: string;
  }) =>
    isOpen ? (
      <div data-testid='modal'>
        <h2>{title}</h2>
        {children}
      </div>
    ) : null,
}));

vi.mock('../components/uncontrolledForm/UncontrolledForm', () => ({
  UncontrolledForm: ({ onSuccess }: { onSuccess: () => void }) => (
    <div>
      <p>Uncontrolled Form</p>
      <button onClick={onSuccess}>Submit Uncontrolled</button>
    </div>
  ),
}));

vi.mock('../components/reactHookForm/ReactHookForm', () => ({
  ReactHookForm: ({ onSuccess }: { onSuccess: () => void }) => (
    <div>
      <p>RHF Form</p>
      <button onClick={onSuccess}>Submit RHF</button>
    </div>
  ),
}));

vi.mock('../components/SubmittedCard/SubmittedCard', () => ({
  SubmittedCard: ({ item }: { item: { id: string; formType: string } }) => (
    <div data-testid='submitted-card'>{item.formType}</div>
  ),
}));

// ---- Мок Redux ----
vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders buttons and title', () => {
    vi.mocked(useSelector).mockReturnValue([]);

    render(<HomePage />);

    expect(screen.getByText('Forms')).toBeInTheDocument();
    expect(screen.getByText('Open Uncontrolled Form')).toBeInTheDocument();
    expect(screen.getByText('Open React Hook Form')).toBeInTheDocument();
  });

  it('opens uncontrolled form modal', () => {
    vi.mocked(useSelector).mockReturnValue([]);

    render(<HomePage />);

    fireEvent.click(screen.getByText('Open Uncontrolled Form'));

    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText('Uncontrolled Form')).toBeInTheDocument();
  });

  it('closes uncontrolled form modal after submit', () => {
    vi.mocked(useSelector).mockReturnValue([]);

    render(<HomePage />);

    fireEvent.click(screen.getByText('Open Uncontrolled Form'));
    expect(screen.getByTestId('modal')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Submit Uncontrolled'));

    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('opens RHF modal', () => {
    vi.mocked(useSelector).mockReturnValue([]);

    render(<HomePage />);

    fireEvent.click(screen.getByText('Open React Hook Form'));

    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText('RHF Form')).toBeInTheDocument();
  });

  it('closes RHF modal after submit', () => {
    vi.mocked(useSelector).mockReturnValue([]);

    render(<HomePage />);

    fireEvent.click(screen.getByText('Open React Hook Form'));
    expect(screen.getByTestId('modal')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Submit RHF'));

    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('renders submitted cards from Redux', () => {
    vi.mocked(useSelector).mockReturnValue([
      { id: '1', formType: 'RHF' },
      { id: '2', formType: 'Uncontrolled' },
    ]);

    render(<HomePage />);

    const cards = screen.getAllByTestId('submitted-card');
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent('Uncontrolled'); // reverse order
    expect(cards[1]).toHaveTextContent('RHF');
  });
});
