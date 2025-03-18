import { Link } from '@remix-run/react';
import { IImage } from '~/interfaces/image.interface';
import { getImageUrl } from '~/utils';
import ImageTypeMarkup from './ImageTypeMarkup';

export default function ImageListLayout({ images }: { images: IImage[] }) {
  console.log(images);
  return (
    <table className='table-auto col-span-12 w-full'>
      <thead className=''>
        <tr className=''>
          <th className='p-3 font-bold uppercase bg-zinc-200 border hidden lg:table-cell'>
            Hình ảnh
          </th>

          <th className='p-3 font-bold uppercase bg-zinc-200 border hidden lg:table-cell'>
            Tiêu đề
          </th>

          <th className='p-3 font-bold uppercase bg-zinc-200 border hidden lg:table-cell'>
            Đường dẫn
          </th>

          <th className='p-3 font-bold uppercase bg-zinc-200 border hidden lg:table-cell'>
            Loại
          </th>

          <th className='p-3 font-bold uppercase bg-zinc-200 border hidden lg:table-cell'>
            Trạng thái hiển thị
          </th>
        </tr>
      </thead>

      <tbody>
        {images.map((img, i) => (
          <tr
            key={i}
            className='bg-white lg:hover:bg-zinc-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0'
          >
            <td className='w-full lg:w-auto text-center border border-b block lg:table-cell relative lg:static hover:underline hover:text-[--main-color]'>
              <Link to={`/cmsdesk/images/${img.id}`}>
                <span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>
                  Hình ảnh
                </span>

                <div className='w-24 aspect-square overflow-hidden mx-auto'>
                  <img
                    src={getImageUrl(img.img_name)}
                    alt={img.img_title}
                    className='object-contain'
                  />
                </div>
              </Link>
            </td>

            <td className='w-full lg:w-auto p-3 text-center border border-b block lg:table-cell relative lg:static'>
              <span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>
                Tiêu đề
              </span>
              <p>{img.img_title}</p>
            </td>

            <td className='w-full lg:w-auto p-3 text-center border border-b block lg:table-cell relative lg:static'>
              <span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>
                Đường dẫn
              </span>

              <p>{img.img_link}</p>
            </td>

            <td className='w-full lg:w-auto p-3 text-center border border-b block lg:table-cell relative lg:static'>
              <span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>
                Loại
              </span>

              <ImageTypeMarkup type={img.img_type} />
            </td>

            <td className='w-full lg:w-auto p-3 text-center border border-b block lg:table-cell relative lg:static'>
              <span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>
                Trạng thái hiển thị
              </span>

              <p>{img.img_isPublic}</p>
              {img.img_isPublic ? (
                <p className='m-auto w-fit bg-green rounded px-2 py-1 text-xs font-bold text-[--sub6-text]'>
                  Công khai
                </p>
              ) : (
                <p className='m-auto w-fit rounded bg-red px-2 py-1 text-xs font-bold text-[--sub6-text]'>
                  Ẩn
                </p>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
