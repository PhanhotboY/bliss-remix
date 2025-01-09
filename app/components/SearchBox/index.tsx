import { Form } from '@remix-run/react';
import { RiCloseLine, RiSearchLine } from '@remixicon/react';
import { useEffect, useState } from 'react';

export default function SearchBox({
  className,
  sketch,
}: {
  className?: string;
  sketch?: boolean;
}) {
  const [query, setQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className='flex justify-center border border-zinc-200 rounded-lg lg:shadow-lg'>
      <Form className='w-full' action='/blog/tim-kiem' method='GET'>
        <div
          className={`h-full w-full flex items-center bg-white rounded-lg overflow-hidden justify-between 
            text-[--sub4-text] lg:divide-x divide-zinc-200 ${className || ''}`}
        >
          <div
            className={`w-full max-w-80 relative h-full flex items-center ${
              sketch ? 'grow' : ''
            }`}
          >
            <input
              className={`text-base text-[--sub4-text] flex-grow outline-none py-2 pr-8 pl-4 w-full`}
              type='text'
              placeholder='Tìm kiếm...'
              name='q'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            {query && (
              <RiCloseLine
                className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-[--sub5-text]'
                onClick={() => setQuery('')}
              />
            )}
          </div>

          <div className='h-full w-max border-none'>
            <button
              className='bg-[--main-color] text-white text-base rounded-lg px-4 py-2 h-full w-max'
              type='submit'
            >
              <RiSearchLine size={16} />
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}
