import { type RefObject, useCallback } from 'react';

export const useClickOutside = (
  overlayRef: RefObject<HTMLDivElement>,
  onClose: () => void
) => {
  return useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === overlayRef.current) {
        onClose();
      }
    },
    [onClose, overlayRef]
  );
};
