import { useFetcher } from '@remix-run/react';
import { RiCloseLine, RiUploadCloud2Line } from '@remixicon/react';
import { useState } from 'react';

export default function ImageInput({
  label,
  name,
  value,
  onChange,
  onDelete,
  ...props
}: {
  name: string;
  label?: string;
  value?: string;
  onDelete?: (...args: any) => void;
  onChange: (...args: any) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  return (
    <div>
      {label && (
        <p className='block text-sm font-semibold leading-6 text-black mb-4'>
          {label}
        </p>
      )}

      <div className='flex flex-col items-center justify-center'>
        {value && (
          <div className='relative wrapper rounded-xl border border-blue-100 w-full flex justify-center p-2 shadow-sm shadow-blue-500 '>
            <img src={value} alt='' className='w-full h-40 object-contain' />

            <button
              className='absolute top-2 right-4'
              type='button'
              onClick={onDelete}
            >
              <RiCloseLine />
            </button>
          </div>
        )}

        <label
          className='cursor-pointer flex-col w-full items-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-6 text-center'
          style={{ display: value ? 'none' : 'flex' }}
        >
          <RiUploadCloud2Line className='w-6 h-6 text-blue-400' />

          <h2 className='text-xl mt-2 font-medium text-gray-700 tracking-wide'>
            {label}
          </h2>

          <p className='mt-2 text-gray-500 tracking-wide'>
            Upload or darg & drop your file SVG, PNG, JPG or GIF.
          </p>

          <input
            id={name}
            type='file'
            accept='image/*'
            className='hidden'
            name={name}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const url = URL.createObjectURL(file);
              onChange(url, e);
            }}
            {...props}
          />
        </label>
      </div>
    </div>
  );
}
