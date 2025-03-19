import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { RiAddLine, RiLayoutGridLine, RiListCheck } from '@remixicon/react';
import { Link, useLoaderData, useLocation } from '@remix-run/react';

import { IImage } from '~/interfaces/image.interface';
import { getImages } from '~/services/image.server';
import LoadingOverlay from '~/components/LoadingOverlay';
import { uploadImages } from '~/services/image.client';
import HandsomeError from '~/components/HandsomeError';
import ImageGridLayout from './components/ImageGridLayout';
import ImageListLayout from './components/ImageListLayout';

export const loader = async () => {
  const images = await getImages();
  return { images };
};

export const meta = [
  {
    title: 'Danh sách ảnh',
  },
];

export default function ImagesPage() {
  const { images: fetchedImages } = useLoaderData<typeof loader>();

  const [images, setImages] = useState<IImage[]>(fetchedImages);
  const [loading, setLoading] = useState(false);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const searchParams = new URL(location.href).searchParams;
    if (searchParams.get('layout')) {
      setLayout(searchParams.get('layout') as 'grid' | 'list');
    }
  }, []);

  return (
    <div>
      <div className='w-full flex gap-4'>
        <button
          className={`border-2 rounded-lg p-2 transition-all ${
            layout === 'grid' ? 'border-blue-500' : 'border-gray-300'
          }`}
          onClick={() => {
            history.pushState(history.state, '', '?layout=grid');
            setLayout('grid');
          }}
        >
          <RiLayoutGridLine size={20} />
        </button>

        <button
          className={`border-2 rounded-lg p-2 transition-all ${
            layout === 'list' ? 'border-blue-500' : 'border-gray-300'
          }`}
          onClick={() => {
            history.pushState(history.state, '', '?layout=list');
            setLayout('list');
          }}
        >
          <RiListCheck size={20} />
        </button>
      </div>

      <div className='pt-4'>
        {layout === 'grid' ? (
          <ImageGridLayout images={images} />
        ) : (
          <ImageListLayout images={images} />
        )}
      </div>

      <button
        className='fixed bottom-24 right-10 center rounded-lg bg-blue-500 p-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg active:bg-blue-500/80'
        onClick={() => {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'image/*';
          input.multiple = true;
          input.onchange = async (e) => {
            setLoading(true);
            const files = (e.target as HTMLInputElement).files;
            if (!files || files.length === 0) {
              toast.error('No image selected');
              setLoading(false);
              return;
            }

            const res = await uploadImages(files);
            if (res?.success !== 1) {
              toast.error(res.toast.message);
              setLoading(false);
              return;
            }

            setImages((prev) => [...prev, ...res.images]);
            setLoading(false);
          };
          input.style.display = 'none';
          input.click();
        }}
      >
        <RiAddLine />
      </button>

      {loading && <LoadingOverlay />}
    </div>
  );
}

export const ErrorBoundary = () => <HandsomeError basePath='/cmsdesk/images' />;
