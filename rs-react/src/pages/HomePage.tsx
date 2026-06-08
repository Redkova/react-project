import { useState, useRef } from 'react';
import { Modal } from '../components/Modal';
import { UncontrolledForm } from '../components/uncontrolledForm/UncontrolledForm';
import { ReactHookForm } from '../components/reactHookForm/ReactHookForm';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { SubmittedCard } from '../components/SubmittedCard/SubmittedCard';

export const HomePage = () => {
  const [isUncontrolledModalOpen, setIsUncontrolledModalOpen] = useState(false);
  const [isReactHookFormModalOpen, setIsReactHookFormModalOpen] =
    useState(false);

  const openUncontrolledModalButtonRef = useRef<HTMLButtonElement | null>(null);
  const openRHFModalButtonRef = useRef<HTMLButtonElement | null>(null);

  const submissions = useSelector(
    (state: RootState) => state.submittedForms.items
  );

  return (
    <div className='min-h-screen flex flex-col items-center p-6'>
      <div className='text-center'>
        <h1 className='mb-6 text-2xl font-bold'>Forms</h1>
        <div className='flex gap-4 mb-6'>
          <button
            ref={openUncontrolledModalButtonRef}
            type='button'
            className='rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-500 cursor-pointer transition'
            onClick={() => setIsUncontrolledModalOpen(true)}
          >
            Open Uncontrolled Form
          </button>
          <button
            ref={openRHFModalButtonRef}
            type='button'
            className='rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-500 cursor-pointer transition'
            onClick={() => setIsReactHookFormModalOpen(true)}
          >
            Open React Hook Form
          </button>
        </div>

        <div className='grid gap-4 w-full max-w-lg'>
          {[...submissions].reverse().map((item) => (
            <SubmittedCard key={item.id} item={item} />
          ))}
        </div>

        <Modal
          isOpen={isUncontrolledModalOpen}
          onClose={() => setIsUncontrolledModalOpen(false)}
          title='User Registration'
          returnFocusRef={openUncontrolledModalButtonRef}
        >
          <UncontrolledForm
            onSuccess={() => {
              setIsUncontrolledModalOpen(false);
            }}
          />
        </Modal>
        <Modal
          isOpen={isReactHookFormModalOpen}
          onClose={() => {
            setIsReactHookFormModalOpen(false);
          }}
          title='User Registration'
          returnFocusRef={openRHFModalButtonRef}
        >
          <ReactHookForm onSuccess={() => setIsReactHookFormModalOpen(false)} />
        </Modal>
      </div>
    </div>
  );
};
