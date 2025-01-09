import { useEffect, useState } from 'react';
import { Link } from '@remix-run/react';
import { RiArrowDownSLine, RiArrowUpSLine } from '@remixicon/react';

export default function ItemList({ items }: { items: any[] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(items.slice(0, 4));

  useEffect(() => {
    if (isExpanded) {
      setItemsToShow(items);
    } else {
      setItemsToShow(items.slice(0, 4));
    }
  }, [isExpanded, items]);

  return (
    <div>
      <ul className='grid grid-cols-12 gap-4 lg:gap-6'>
        {itemsToShow.map((item, index) => (
          <li
            key={index}
            className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3'
          >
            <Link
              to={`/${item.slug}`}
              className='py-4 px-8 shadow-lg rounded-lg border border-zinc-200 bg-white flex flex-col items-center gap-4'
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className='rounded-full aspect-square w-40 border'
                loading='lazy'
              />

              <h3 className='text-center w-full overflow-hidden text-ellipsis whitespace-nowrap'>
                {item.title}
              </h3>

              <p className='text-xs text-[--sub2-text] text-center w-full overflow-hidden text-ellipsis whitespace-nowrap'>{`${item.count} ${item.title}`}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div className='mt-6'>
        {isExpanded ? (
          <button
            className='inline-flex items-center rounded border border-[--main-color] px-4 py-2 text-sm font-semibold text-[--main-color] transition-all hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
            onClick={() => {
              setIsExpanded(false);
            }}
          >
            Thu gọn <RiArrowUpSLine />
          </button>
        ) : (
          <button
            className='inline-flex items-center rounded border border-[--main-color] px-4 py-2 text-sm font-semibold text-[--main-color] transition-all hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
            onClick={() => {
              setIsExpanded(true);
            }}
          >
            Xem thêm <RiArrowDownSLine />
          </button>
        )}
      </div>
    </div>
  );
}
