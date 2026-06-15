import { type UncontrolledFieldRendererProps } from '../FormFieldRenderUncontrolled';

export const FileFieldUncontrolled = ({
  field,
  fileRef,
  fileName,
  setFileName,
  errors,
}: UncontrolledFieldRendererProps) => {
  return (
    <div className='mb-2'>
      <label className='block mb-1 font-medium'>{field.label}</label>

      <input
        ref={fileRef}
        id='file'
        type='file'
        accept='image/png, image/jpeg'
        className='hidden'
        onChange={(e) => {
          const file = e.target.files?.[0];
          setFileName(file ? file.name : null);
        }}
      />

      <label
        htmlFor='file'
        className='inline-block bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-500'
      >
        Choose file
      </label>

      <p className='mt-2 text-sm text-gray-600'>
        {fileName ? `Selected: ${fileName}` : 'No file chosen'}
      </p>

      {errors.file && <p className='text-red-600 text-sm'>{errors.file}</p>}
    </div>
  );
};
