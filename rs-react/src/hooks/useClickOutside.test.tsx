import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { useRef } from 'react';
import { useClickOutside } from './useClickOutside';

const TestComponent = ({ onClose }: { onClose: () => void }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const handleClick = useClickOutside(overlayRef, onClose);

  return (
    <div ref={overlayRef} data-testid='overlay' onClick={handleClick}>
      <div data-testid='content'>Inside</div>
    </div>
  );
};

describe('useClickOutside', () => {
  it('calls onClose when clicking on overlay', () => {
    const onClose = vi.fn();
    const { getByTestId } = render(<TestComponent onClose={onClose} />);

    fireEvent.click(getByTestId('overlay'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onClose when clicking inside content', () => {
    const onClose = vi.fn();
    const { getByTestId } = render(<TestComponent onClose={onClose} />);

    fireEvent.click(getByTestId('content'));

    expect(onClose).not.toHaveBeenCalled();
  });
});
