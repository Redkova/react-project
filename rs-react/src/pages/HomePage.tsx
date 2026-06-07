import { useState, useRef } from 'react';
import { Modal } from '../components/Modal';

export const HomePage = () => {
  const [isUncontrolledModalOpen, setIsUncontrolledModalOpen] = useState(false);
  const [isReactHookFormModalOpen, setIsReactHookFormModalOpen] =
    useState(false);

  const openUncontrolledModalButtonRef = useRef<HTMLButtonElement | null>(null);
  const openRHFModalButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className='min-h-screen flex flex-col items-center p-6'>
      <div className='text-center'>
        <h1 className='mb-6 text-2xl font-bold'>Forms</h1>
        <div className='flex gap-4'>
          <button
            ref={openUncontrolledModalButtonRef}
            type='button'
            className='rounded bg-blue-600 px-4 py-2 text-white'
            onClick={() => setIsUncontrolledModalOpen(true)}
          >
            Open Uncontrolled Form
          </button>
          <button
            ref={openRHFModalButtonRef}
            type='button'
            className='rounded bg-emerald-600 px-4 py-2 text-white'
            onClick={() => setIsReactHookFormModalOpen(true)}
          >
            Open React Hook Form
          </button>
        </div>

        <Modal
          isOpen={isUncontrolledModalOpen}
          onClose={() => setIsUncontrolledModalOpen(false)}
          title='Uncontrolled Form'
          returnFocusRef={openUncontrolledModalButtonRef}
        >
          <div></div>
        </Modal>
        <Modal
          isOpen={isReactHookFormModalOpen}
          onClose={() => setIsReactHookFormModalOpen(false)}
          title='React Hook Form'
          returnFocusRef={openRHFModalButtonRef}
        >
          <div></div>
        </Modal>
      </div>
    </div>
  );
};
