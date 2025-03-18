import { RiUploadCloud2Line } from '@remixicon/react';
import ImagePreview from './ImagePreview';
import ImagePicker from './ImagePicker';
import { useState } from 'react';

export default function ImageInput({
  label,
  name,
  value,
  onChange,
  multiple = false,
  ...props
}: {
  name: string;
  label?: string;
  value: string | string[];
  onChange: (...args: any) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>) {
  const [showPicker, setShowPicker] = useState(false);

  const handleOpenPicker = () => {
    setShowPicker(true);
  };

  const handleClosePicker = () => {
    setShowPicker(false);
  };

  const handleSelectImage = (selectedImages: string[]) => {
    if (multiple) {
      onChange(selectedImages);
    } else {
      onChange(selectedImages[0]);
    }
  };

  return (
    <div>
      {label && (
        <p className='block text-sm font-semibold leading-6 text-black mb-4'>
          {label}
        </p>
      )}

      <div
        className={`${
          multiple ? 'grid' : 'flex'
        } grid-cols-4 gap-4 items-center justify-center`}
      >
        {typeof value === 'string' && !!value && (
          <ImagePreview src={value} handleOpenPicker={handleOpenPicker} />
        )}

        {Array.isArray(value) &&
          !!value.length &&
          value.map((v, i) => (
            <ImagePreview key={i} src={v} handleOpenPicker={handleOpenPicker} />
          ))}

        <label
          className='cursor-pointer flex-col w-full items-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-6 text-center'
          style={{ display: value && !multiple ? 'none' : 'flex' }}
          onClick={handleOpenPicker}
        >
          <RiUploadCloud2Line className='w-6 h-6 text-blue-400' />

          <h2 className='text-xl mt-2 font-medium text-gray-700 tracking-wide'>
            {label}
          </h2>

          <p className='mt-2 text-gray-500 tracking-wide'>
            Upload your file SVG, PNG, JPG or GIF.
          </p>
        </label>

        <input type='hidden' name={name} value={value} {...props} />
      </div>

      {showPicker && (
        <ImagePicker
          selected={Array.isArray(value) ? value : [value]}
          multiple={multiple}
          onClose={handleClosePicker}
          onSelect={handleSelectImage}
        />
      )}
    </div>
  );
}
