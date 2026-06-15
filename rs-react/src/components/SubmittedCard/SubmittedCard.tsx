import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { markAsOld } from '../../store/submittedFormsSlice';
import { type FormValuesData } from '../../types/forms';

type Props = {
  item: {
    id: string;
    formType: string;
    data: FormValuesData;
    createdAt: string;
    isNew?: boolean;
  };
};

export const SubmittedCard = ({ item }: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (item.isNew) {
      const timer = setTimeout(() => {
        dispatch(markAsOld(item.id));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [item.isNew, item.id, dispatch]);

  return (
    <div
      className={`
        border rounded-lg p-4 shadow w-full max-w-md transition-all duration-500
        ${item.isNew ? 'bg-green-100 border-green-400' : 'bg-white'}
      `}
    >
      <h3 className='text-lg font-semibold mb-3 capitalize'>
        {item.formType} form
      </h3>
      <div className='space-y-2 text-sm max-w-xs mx-auto'>
        {item.data.fileBase64 && (
          <div className='flex items-center justify-center'>
            <img
              src={item.data.fileBase64 as string}
              alt='Uploaded'
              className='w-15 h-20 object-cover rounded border'
            />
          </div>
        )}
        <div className='space-y-2 text-sm'>
          <div className='grid grid-cols-2 gap-4 justify-items-center'>
            <span className='font-medium'>Name:</span>
            <span>{item.data.name as string}</span>
          </div>

          <div className='grid grid-cols-2 gap-4 justify-items-center'>
            <span className='font-medium'>Age:</span>
            <span>{item.data.age as string}</span>
          </div>

          <div className='grid grid-cols-2 gap-4 justify-items-center'>
            <span className='font-medium'>Email:</span>
            <span>{item.data.email as string}</span>
          </div>

          <div className='grid grid-cols-2 gap-4 justify-items-center'>
            <span className='font-medium'>Gender:</span>
            <span>{item.data.gender as string}</span>
          </div>

          <div className='grid grid-cols-2 gap-4 justify-items-center'>
            <span className='font-medium'>Country:</span>
            <span>{item.data.country as string}</span>
          </div>

          <div className='grid grid-cols-2 gap-4 justify-items-center'>
            <span className='font-medium'>Terms:</span>
            <span>{item.data.terms ? 'Accepted' : 'Not accepted'}</span>
          </div>

          <div className='grid grid-cols-2 gap-4 justify-items-center'>
            <span className='font-medium'>Password:</span>
            <span>{item.data.password as string}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
