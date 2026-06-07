import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addSubmittedForm } from '../../store/submittedFormsSlice';

type RHFValues = {
  name: string;
  age: number;
  email: string;
  gender: string;
  terms: boolean;
};

export const ReactHookForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<RHFValues>();

  const onSubmit = (formValues: RHFValues) => {
    dispatch(
      addSubmittedForm({
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        formType: 'rhf',
        data: formValues,
        createdAt: new Date().toISOString(),
      })
    );
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='name'>Name</label>
      <input
        id='name'
        {...register('name')}
        className='border p-2 rounded w-full mb-4'
      />

      <label htmlFor='age'>Age</label>
      <input
        id='age'
        type='number'
        {...register('age')}
        className='border p-2 rounded w-full mb-4'
      />

      <label htmlFor='email'>Email</label>
      <input
        id='email'
        type='email'
        {...register('email')}
        className='border p-2 rounded w-full mb-4'
      />

      <label htmlFor='gender'>Gender</label>
      <select
        id='gender'
        {...register('gender')}
        className='border p-2 rounded w-full mb-4'
      >
        <option value=''>Select gender</option>
        <option value='female'>Female</option>
        <option value='male'>Male</option>
      </select>

      <label htmlFor='terms' className='flex items-center gap-2'>
        <input id='terms' type='checkbox' {...register('terms')} />
        Accept Terms & Conditions
      </label>

      <button
        type='submit'
        className='mt-4 bg-emerald-600 text-white px-4 py-2 rounded'
      >
        Submit
      </button>
    </form>
  );
};
