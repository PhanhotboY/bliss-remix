import React, { useEffect, useState } from 'react';
import ImagePreview from '../ImagePreview';
import { IImage } from '~/interfaces/image.interface';
import ImageUploader from './ImageUploader';
import { getImageUrl } from '~/utils';
import ImageMetadata from './ImageMetadata';

interface ImagePickerProps {
  multiple?: boolean;
  selected?: string[];
  defaultActiveTab?: number;
  onClose: () => void;
  onSelect: (selectedImages: string[]) => void;
}

export default function ImagePicker({
  selected = [],
  multiple = false,
  defaultActiveTab = 2,
  onClose,
  onSelect,
}: ImagePickerProps) {
  const [images, setImages] = useState<IImage[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>(selected);
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const handleImageClick = (index: number) => {
    if (multiple) {
      setSelectedImages((prev) => {
        const res = prev.includes(images[index].img_name)
          ? prev.filter((_, i) => i !== index) // Deselect if already selected
          : [...prev, images[index].img_name]; // Add to selection

        console.log(res);
        return res;
      });
    } else {
      setSelectedImages([images[index].img_name]); // Allow only one selection
    }
  };

  const handleConfirm = () => {
    onSelect(selectedImages);
    onClose();
  };

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/data?getter=getImages');
      const images = (await res.json()) as IImage[];

      setImages(images);
      // setImages(images.map((image) => image.img_name));
    })();

    const escapeHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', escapeHandler);

    return () => {
      document.removeEventListener('keydown', escapeHandler);
    };
  }, []);

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-8 z-50'>
      <div className='flex flex-col bg-white gap-4 p-6 rounded-lg shadow-lg w-full h-full overflow-y-auto'>
        <div className='flex-grow grid grid-cols-12 divide-x divide-zinc-200 gap-4'>
          <div
            className={`${
              activeTab === 1 ? 'col-span-12' : 'col-span-9'
            } flex-grow w-full h-full divide-y divide-zinc-200 transition-all`}
          >
            <div className='w-full flex gap-4 px-4'>
              <button
                className={`-mb-[1px] rounded-t px-2 py-1 border-zinc-200 ${
                  activeTab === 1 ? 'border border-b-white' : ''
                }`}
                onClick={() => setActiveTab(1)}
                type='button'
              >
                Tải lên tệp mới
              </button>
              <button
                className={`-mb-[1px] rounded-t px-2 py-1 border-zinc-200 ${
                  activeTab === 2 ? 'border border-b-white' : ''
                }`}
                onClick={() => setActiveTab(2)}
                type='button'
              >
                Chọn từ thư viện Media
              </button>
            </div>

            {activeTab === 1 && (
              <ImageUploader
                handleImageUploaded={(images) => {
                  handleImageClick(0);
                  setImages((prev) => [...prev, ...images]);
                  setActiveTab(2);
                }}
              />
            )}
            {activeTab === 2 && (
              <div className='grid grid-cols-8 gap-4 pt-4'>
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`border-2 rounded-lg aspect-square cursor-pointer flex justify-center items-center transition-all ${
                      selectedImages.includes(image.img_name)
                        ? 'border-blue-500'
                        : 'border-gray-300'
                    } overflow-hidden`}
                    onClick={() => handleImageClick(index)}
                  >
                    <img
                      src={getImageUrl(image.img_name)}
                      alt={image.img_title}
                      className=''
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {activeTab === 1 || (
            <div className='col-span-3 h-full pl-4 flex flex-col gap-4'>
              <ImagePreview src={selectedImages[0]} />
              <ImageMetadata
                image={
                  images.find((img) => img.img_name === selectedImages[0]) ||
                  ({} as any)
                }
              />
            </div>
          )}
        </div>

        <div className='h-fit flex justify-between'>
          <button
            onClick={onClose}
            className='bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition'
            type='button'
          >
            Hủy bỏ
          </button>

          <button
            onClick={handleConfirm}
            className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition'
            type='button'
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
