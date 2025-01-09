import { ActionFunctionArgs, json } from '@remix-run/node';
import { useFetcher } from '@remix-run/react';
import { RiAddLine } from '@remixicon/react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import ImageInput from './ImageInput';
import { ISliderImage } from '~/interfaces/slider.interface';

export default function SliderInput({
  label,
  type,
  hasLink = false,
  defaultImages = [],
}: {
  label: string;
  type: string;
  hasLink?: boolean;
  defaultImages?: Array<ISliderImage>;
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
        action={`/cmsdesk/images`}
      >
        <p className='text-2xl text-[--sub4-text] font-bold'>{label}</p>

        <input hidden name='type' defaultValue={type} />
        <input hidden name='images' value={JSON.stringify(images)} readOnly />
        <button
          className='middle none center w-fit rounded-lg bg-blue-500 py-3 px-6 font-sans text-sm font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          data-ripple-light='true'
          type='submit'
          disabled={!isChanged}
        >
          Cập nhật
        </button>
      </fetcher.Form>

      {images.map((img, i) => (
        <div className='col-span-3' key={i}>
          <ImageInput
            name={`${type}-${i}`}
            required
            value={img.url}
            onChange={async (url: string, e) => {
              const toastId = toast.loading('Uploading image...');
              try {
                const formData = new FormData();
                formData.append('img', e.target.files?.[0]);
                formData.append('folder', type);

                const res = await fetch('/cmsdesk/images/upload', {
                  method: 'POST',
                  body: formData,
                });
                const data = await res.json();
                toast.update(toastId, {
                  type: data.toast.type || 'error',
                  render: data.toast.message,
                  autoClose: 3000,
                  isLoading: false,
                });
                setImages((prev) =>
                  prev.map((img, index) =>
                    index === i ? { url: data.imageUrl, alt: img.alt } : img
                  )
                );
              } catch (error: any) {
                toast.update(toastId, {
                  type: 'error',
                  render: error.message,
                  isLoading: false,
                  autoClose: 3000,
                });
              }
            }}
            onDelete={() => {
              setImages((prev) =>
                prev.map((img, index) =>
                  index === i ? { url: '', alt: '' } : img
                )
              );
            }}
          />

          <input
            className='w-full border-b border-zinc-200 py-1 px-2 outline-none'
            name={`${type}-${i}-alt`}
            defaultValue={img.alt}
            onChange={(e) =>
              setImages((prev) =>
                prev.map((img, index) =>
                  index === i ? { ...img, alt: e.target.value } : img
                )
              )
            }
          />

          {hasLink && (
            <input
              className='w-full border-b border-zinc-200 py-1 px-2 outline-none'
              name={`${type}-${i}-link`}
              defaultValue={img.link}
              onChange={(e) =>
                setImages((prev) =>
                  prev.map((img, index) =>
                    index === i ? { ...img, link: e.target.value } : img
                  )
                )
              }
            />
          )}
        </div>
      ))}

      <button
        className='middle col-span-1 none center w-full rounded-lg border border-zinc-200 py-3 px-6 
    font-sans text-sm font-bold shadow transition-all bg-zinc-200 cursor-pointer
    hover:shadow-lg active:opacity-[0.85] 
    active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
        data-ripple-light='true'
        type='button'
        onClick={() => setImages([...images, { url: '', alt: '' }])}
      >
        <RiAddLine />
      </button>
    </div>
  );
}
