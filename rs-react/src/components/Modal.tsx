import { type ReactNode, useEffect, useRef, useId } from 'react';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { useInitialFocus } from '../hooks/useInitialFocus';
import { useReturnFocus } from '../hooks/useReturnFocus';
import { useClickOutside } from '../hooks/useClickOutside';
import { createPortal } from 'react-dom';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  returnFocusRef?: React.RefObject<HTMLElement>;
};

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  returnFocusRef,
}: ModalProps) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const titleId = useId();
  const modalRoot = document.getElementById('modal-root');

  useEscapeKey(isOpen, onClose);
  useInitialFocus(isOpen, closeButtonRef);
  useReturnFocus(isOpen, returnFocusRef);

  const handleOverlayClick = useClickOutside(overlayRef, onClose);

  if (!modalRoot || !isOpen) {
    return null;
  }

  return createPortal(
    <div
      ref={overlayRef}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
      onClick={handleOverlayClick}
      aria-hidden='true'
    >
      <div
        ref={dialogRef}
        role='dialog'
        aria-modal='true'
        aria-labelledby={title ? titleId : undefined}
        className='relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg'
      >
        <div className='mb-4 flex items-center justify-between'>
          {title && (
            <h2 id={titleId} className='text-lg font-semibold'>
              {title}
            </h2>
          )}

          <button
            ref={closeButtonRef}
            type='button'
            onClick={onClose}
            className='rounded px-2 py-1 text-2xl hover:bg-gray-100 cursor-pointer hover:text-red-500'
          >
            x
          </button>
        </div>
        {children}
      </div>
    </div>,
    modalRoot
  );
};
