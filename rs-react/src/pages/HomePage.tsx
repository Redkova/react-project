import { useState, useRef } from 'react';
import { Modal } from '../components/Modal';
import { UncontrolledForm } from '../components/uncontrolledForm/UncontrolledForm';
import { ReactHookForm } from '../components/reactHookForm/ReactHookForm';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

export const HomePage = () => {
  const [isUncontrolledModalOpen, setIsUncontrolledModalOpen] = useState(false);
  const [isReactHookFormModalOpen, setIsReactHookFormModalOpen] =
    useState(false);

  const openUncontrolledModalButtonRef = useRef<HTMLButtonElement | null>(null);
  const openRHFModalButtonRef = useRef<HTMLButtonElement | null>(null);

  const submissions = useSelector(
    (state: RootState) => state.submissions.items
  );

  return (
    <div className='min-h-screen flex flex-col items-center p-6'>
      <div className='text-center'>
        <h1 className='mb-6 text-2xl font-bold'>Forms</h1>
        <div className='flex gap-4'>
          <button
            ref={openUncontrolledModalButtonRef}
            type='button'
            className='rounded bg-blue-600 px-4 py-2 text-white cursor-pointer'
            onClick={() => setIsUncontrolledModalOpen(true)}
          >
            Open Uncontrolled Form
          </button>
          <button
            ref={openRHFModalButtonRef}
            type='button'
            className='rounded bg-emerald-600 px-4 py-2 text-white cursor-pointer'
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
          <UncontrolledForm
            onSuccess={() => setIsUncontrolledModalOpen(false)}
          />
        </Modal>
        <Modal
          isOpen={isReactHookFormModalOpen}
          onClose={() => setIsReactHookFormModalOpen(false)}
          title='React Hook Form'
          returnFocusRef={openRHFModalButtonRef}
        >
          <ReactHookForm onSuccess={() => setIsReactHookFormModalOpen(false)} />
        </Modal>
        <div className='mt-8 grid gap-4'>
          {submissions.map((item) => (
            <div key={item.id} className='border rounded p-4 shadow'>
              <p className='text-sm text-gray-500'>{item.formType}</p>
              <p className='text-xs text-gray-400'>{item.createdAt}</p>

              <pre className='mt-2 bg-gray-100 p-2 rounded text-xs'>
                {JSON.stringify(item.data, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
