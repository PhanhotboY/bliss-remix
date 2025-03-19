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
          multiple
          onChange={async (e) => {
            const toastId = toast.loading('Uploading image...');

            if (!e.target.files || e.target.files.length === 0) {
              toast.update(toastId, {
                type: 'error',
                data: 'No image selected',
              });
              return;
            }

            try {
              const res = await uploadImages(e.target.files);

              if (res.success !== 1) {
                toast.update(toastId, {
                  type: 'error',
                  data: res.toast.message,
                });
                return;
              }

              toast.update(toastId, {
                type: 'success',
                data: res.toast.message,
                autoClose: 3000,
                isLoading: false,
              });
              handleImageUploaded(res.images);
            } catch (err: any) {
              toast.update(toastId, { type: 'error', data: err.message });
            }
          }}
        />
      </label>
    </div>
  );
}
