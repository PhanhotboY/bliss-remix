import { useFetcher } from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import ImageInput from '~/components/ImageInput';
import { IImage } from '~/interfaces/image.interface';

export default function SliderInput({
  label,
  type,
  defaultImages = [],
}: {
  label: string;
  type: string;
  defaultImages?: Array<IImage>;
}) {
  const fetcher = useFetcher<any>();
  const toastIdRef = useRef<any>(null);

  const [images, setImages] = useState(defaultImages);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setIsChanged(JSON.stringify(images) !== JSON.stringify(defaultImages));
  }, [images]);

  useEffect(() => {
    switch (fetcher.state) {
      case 'submitting':
        toastIdRef.current = toast.loading('Loading...', {
          autoClose: false,
        });

        break;

      case 'idle':
        if (fetcher.data?.toast && toastIdRef.current) {
          const { toast: toastData } = fetcher.data as any;
          toast.update(toastIdRef.current, {
            render: toastData.message,
            type: toastData.type || 'success', // Default to 'success' if type is not provided
            autoClose: 3000,
            isLoading: false,
          });
          toastIdRef.current = null;
          setIsChanged(false);
          break;
        }

        toast.update(toastIdRef.current, {
          render: fetcher.data?.toast.message,
          autoClose: 3000,
          isLoading: false,
          type: 'error',
        });

        break;
    }
  }, [fetcher.state]);

  return (
    <div className='grid grid-cols-12 gap-8'>
      <fetcher.Form
        className='col-span-12 flex justify-between items-center'
        method='POST'
        action={`/cmsdesk/sliders`}
      >
        <p className='text-2xl text-[--sub4-text] font-bold'>{label}</p>

        <input hidden name='type' defaultValue={type} />
        <input
          hidden
          name='images'
          value={JSON.stringify(images.map((img) => img.id))}
          readOnly
        />
        <button
          className='middle none center w-fit rounded-lg bg-blue-500 py-3 px-6 font-sans text-sm font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          data-ripple-light='true'
          type='submit'
          disabled={!isChanged}
        >
          Cập nhật
        </button>
      </fetcher.Form>

      <div className='col-span-12'>
        <ImageInput
          name={`${type}`}
          required
          value={images}
          multiple
          onChange={async (value) => {
            try {
              setImages(Array.isArray(value) ? value : [value]);
            } catch (error: any) {
              console.error(error);
            }
          }}
        />
      </div>
    </div>
  );
}
