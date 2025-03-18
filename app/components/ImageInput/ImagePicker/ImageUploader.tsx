import { RiUploadCloud2Line } from '@remixicon/react';
import { toast } from 'react-toastify';
import { IImage } from '~/interfaces/image.interface';
import { uploadImages } from '~/services/image.client';

export default function ImageUploader({
  multiple = true,
  handleImageUploaded,
  ...props
}: { handleImageUploaded: (image: IImage[]) => void } & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
>) {
  return (
    <div className={`flex gap-4 items-center justify-center h-full`}>
      <label className='cursor-pointer flex-col w-1/2 items-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-6 text-center'>
        <RiUploadCloud2Line className='w-6 h-6 text-blue-400 m-auto' />

        <h2 className='text-xl mt-2 font-medium text-gray-700 tracking-wide'>
          Upload Image
        </h2>

        <p className='mt-2 text-gray-500 tracking-wide'>
          Upload your file SVG, PNG, JPG or GIF.
        </p>

        <input
          type='file'
          accept='image/*'
          hidden
          onChange={async (e) => {
            if (!e.target.files || e.target.files.length === 0) {
              toast.error('No image selected');
              return;
            }

            const res = await uploadImages(e.target.files);
            if (res.success !== 1) {
              toast.error(res.toast.message);
              return;
            }

            handleImageUploaded(res.images);
          }}
        />
      </label>
    </div>
  );
}
