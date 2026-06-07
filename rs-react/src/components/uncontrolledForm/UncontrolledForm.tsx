import { useDispatch } from 'react-redux';
import { addSubmittedForm } from '../../store/submittedFormsSlice';
import { useInputFields } from '../../hooks/useInputFields';
import { getUserData } from '../../utils/getUserData';

type Props = {
  onSuccess?: () => void;
};

export const UncontrolledForm = ({ onSuccess }: Props) => {
  const dispatch = useDispatch();
  const { inputFields, refs } = useInputFields();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = getUserData(refs, inputFields);

    dispatch(
      addSubmittedForm({
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        formType: 'uncontrolled',
        data: userData,
        createdAt: new Date().toISOString(),
      })
    );
    onSuccess?.();
  };
  return (
    <form onSubmit={handleSubmit}>
      {inputFields.map((field) => (
        <div key={field.name} className='mb-4'>
          <label htmlFor={field.name} className='block mb-1 font-medium'>
            {field.label}
          </label>

          {field.type === 'select' ? (
            <select
              ref={refs[field.name]}
              id={field.name}
              className='border p-2 rounded w-full'
            >
              <option value=''>Select gender</option>
              <option value='female'>Female</option>
              <option value='male'>Male</option>
            </select>
          ) : field.type === 'checkbox' ? (
            <input
              ref={refs[field.name]}
              id={field.name}
              type='checkbox'
              className='mr-2'
            />
          ) : (
            <input
              ref={refs[field.name]}
              id={field.name}
              type={field.type}
              className='border p-2 rounded w-full'
            />
          )}
        </div>
      ))}

      <button
        type='submit'
        className='mt-4 bg-blue-600 text-white px-4 py-2 rounded'
      >
        Submit
      </button>
    </form>
  );
};
