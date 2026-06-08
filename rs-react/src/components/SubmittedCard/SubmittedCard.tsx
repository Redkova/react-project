import React from 'react';

type Props = {
  item: {
    id: string;
    formType: string;
    data: Record<string, unknown>;
    createdAt: string;
  };
};

export const SubmittedCard = ({ item }: Props) => {
  return (
    <div className='border rounded-lg p-4 shadow bg-white w-full max-w-md'>
      <h3 className='text-lg font-semibold mb-3 capitalize'>
        {item.formType} form
      </h3>
      <div className='space-y-2 text-sm max-w-xs mx-auto'>
        {item.data.fileBase64 && (
          <div className='flex items-center justify-center'>
            <img
              src={item.data.fileBase64 as string}
              alt='Uploaded'
              className='w-[40px] h-[60px] object-cover rounded border'
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
            <span className='font-medium'>Terms:</span>
            <span>{item.data.terms ? 'Accepted' : 'Not accepted'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
