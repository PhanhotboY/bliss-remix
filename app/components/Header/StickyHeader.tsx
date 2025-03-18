import { Link } from '@remix-run/react';
import { RiListCheck, RiSearchLine } from '@remixicon/react';
import { useState } from 'react';
import { useRootLoaderData } from '~/lib/useRootLoaderData';
import NavBar from './NavBar';
import SearchBox from '../SearchBox';
import BookingPopup from '../BookingPopup';

export default function StickyHeader({ shadow }: { shadow?: boolean }) {
  const { appSettings } = useRootLoaderData();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isShowSearchBox, setIsShowSearchBox] = useState(false);
  const [isShowBookingPopup, setIsShowBookingPopup] = useState(false);

  return (
    <header
      className={`${
        shadow ? 'shadow-lg' : ''
      } sticky top-0 w-full bg-white flex z-40 text-lg`}
    >
      <div className='container !flex items-center justify-between'>
        <div className='block lg:hidden'>
          <button
            className='w-max inline-flex items-center gap-2 rounded-full p-3
    transition-all hover:shadow-lg disabled:pointer-events-none bg-[--main-color] text-white
    font-bold disabled:opacity-50 disabled:shadow-none'
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <RiListCheck size={16} />
          </button>
        </div>

        <div className='flex items-center gap-4'>
          <div className='logo h-20'>
            <Link className='h-full py-2' to='/'>
              <img
                className='h-full w-full object-contain'
                src={appSettings.app_logo}
                alt={appSettings.app_title}
              />
            </Link>
          </div>

          <NavBar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>

        <div className='flex items-center gap-4 xl:gap-8'>
          <div className='hidden xl:block'>
            <button
              className='w-max inline-flex items-center gap-2 rounded-full px-6 py-2 
    transition-all hover:shadow-lg disabled:pointer-events-none bg-[--main-color] text-white
    font-bold disabled:opacity-50 disabled:shadow-none'
              onClick={() => setIsShowBookingPopup(true)}
            >
              Đặt lịch tư vấn
            </button>
          </div>

          {/* <div className=''>
            <button
              className='w-max inline-flex items-center gap-2 rounded-full p-3
    transition-all hover:shadow-lg disabled:pointer-events-none bg-[--main-color] text-white
    font-bold disabled:opacity-50 disabled:shadow-none'
            >
              <RiShoppingCartLine size={18} />
            </button>
          </div> */}

          <div className='hidden lg:block relative'>
            <button
              className='w-max inline-flex items-center gap-2 rounded-full p-3 
    transition-all hover:shadow-lg disabled:pointer-events-none bg-[--main-color] text-white
    font-bold disabled:opacity-50 disabled:shadow-none'
              onClick={() => setIsShowSearchBox(!isShowSearchBox)}
            >
              <RiSearchLine size={18} />
            </button>

            {isShowSearchBox && (
              <div className='absolute top-full mt-2 right-0 w-64'>
                <SearchBox />
              </div>
            )}
          </div>
        </div>
      </div>

      {isShowBookingPopup && (
        <BookingPopup hidePopup={() => setIsShowBookingPopup(false)} />
      )}
    </header>
  );
}
