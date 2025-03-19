import { RiUploadCloud2Line } from '@remixicon/react';
import ImagePreview from './ImagePreview';
import ImagePicker from './ImagePicker';
import { useState } from 'react';
import { IImage } from '~/interfaces/image.interface';
import { isEmpltyObject } from '~/utils';

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
  value: IImage | IImage[];
  onChange: (value: IImage | IImage[], ...args: any) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>) {
  const [showPicker, setShowPicker] = useState(false);

  const handleOpenPicker = () => {
    setShowPicker(true);
  };

  const handleClosePicker = () => {
    setShowPicker(false);
  };

  const handleSelectImage = (selectedImages: IImage[]) => {
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
        {!Array.isArray(value) && !isEmpltyObject(value) && (
          <ImagePreview
            src={value?.img_url}
            handleOpenPicker={handleOpenPicker}
          />
        )}

        {Array.isArray(value) &&
          !!value.length &&
          value.map((v, i) => (
            <ImagePreview
              key={i}
              src={v.img_url}
              handleOpenPicker={handleOpenPicker}
            />
          ))}

        <label
          className='cursor-pointer flex-col w-full items-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-6 text-center'
          style={{
            display: !isEmpltyObject(value) && !multiple ? 'none' : 'flex',
          }}
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

        <input
          type='hidden'
          name={name}
          value={
            Array.isArray(value) ? value.map((v) => v.id) : value?.id || ''
          }
          {...props}
        />
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
