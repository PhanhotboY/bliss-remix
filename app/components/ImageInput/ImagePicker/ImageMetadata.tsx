import { useEffect, useState } from 'react';

import { IImage } from '~/interfaces/image.interface';
import { getImageUrl, toVnDateString } from '~/utils';

export default function ImageMetadata({ image }: { image: IImage }) {
  const [dimension, setDimension] = useState('0x0');
  const [size, setSize] = useState(0);
  const [type, setType] = useState('image/jpeg');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const img = new Image();
      const res = await fetch(getImageUrl(image.img_name));
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      img.onload = () => {
        setDimension(`${img.naturalWidth}x${img.naturalHeight}`);
        setSize(blob.size / 1024);
        setType(blob.type);
        setLoading(false);
      };
      img.src = url;
    })();
  });

  return loading ? (
    <div className='bg-white rounded-lg p-4 animate-pulse'>
      <div className='w-2/3 h-4 bg-zinc-300 rounded mb-2'></div>
      <div className='w-full h-8 bg-zinc-300 rounded mb-2'></div>
      <div className='w-full h-8 bg-zinc-300 rounded mb-2'></div>
      <div className='w-1/2 h-8 bg-zinc-300 rounded'></div>
    </div>
  ) : (
    <div className='flex flex-col gap-2'>
      <p>
        <b>Đã tải lên vào lúc: </b>
        {toVnDateString(image.createdAt)}
      </p>

      <p className='truncate'>
        <b>Tên tệp tin: </b>
        {image.img_name}
      </p>
      <p>
        <b>Loại tệp tin: </b>
        {type}
      </p>
      <p>
        <b>Dung lượng tệp: </b>
        {size.toFixed(1)} KB
      </p>
      <p>
        <b>Kích thước: </b>
        {dimension} px
      </p>
    </div>
  );
}
