import { useEffect } from 'react';

export const useInitialFocus = (
  isOpen: boolean,
  ref: React.RefObject<HTMLElement | null>
) => {
  useEffect(() => {
    if (isOpen) {
      ref.current?.focus();
    }
  }, [isOpen, ref]);
};
