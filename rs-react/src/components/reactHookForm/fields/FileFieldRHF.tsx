import { type FieldRendererProps } from '../FormFieldRenderRHF';

export const FileFieldRHF = ({
  field,
  register,
  errors,
  fileName,
  setFileName,
}: FieldRendererProps) => {
  const fileRegister = register(field.name);

  return (
    <div className='mb-2'>
      <label className='block mb-1 font-medium'>{field.label}</label>

      <input
        id={field.name}
        type='file'
        accept='image/png, image/jpeg'
        className='hidden'
        {...fileRegister}
        onChange={(e) => {
          fileRegister.onChange(e);
          const file = e.target.files?.[0];
          setFileName(file ? file.name : null);
        }}
      />

      <label
        htmlFor={field.name}
        className='inline-block bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-500'
      >
        Choose file
      </label>

      <p className='mt-2 text-sm text-gray-600'>
        {fileName ? `Selected: ${fileName}` : 'No file chosen'}
      </p>

      {errors[field.name] && (
        <p className='text-red-600 text-sm'>{errors[field.name]?.message}</p>
      )}
    </div>
  );
};
