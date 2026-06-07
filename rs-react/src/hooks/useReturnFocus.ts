import { useEffect } from 'react';

export const useReturnFocus = (
  isOpen: boolean,
  returnFocusRef?: React.RefObject<HTMLElement>
) => {
  useEffect(() => {
    if (!isOpen && returnFocusRef?.current) {
      returnFocusRef?.current?.focus();
    }
  }, [isOpen, returnFocusRef]);
};
