import { RiMapPinLine, RiPhoneLine, RiTimeLine } from '@remixicon/react';

import { useRootLoaderData } from '~/lib/useRootLoaderData';
import { toAddressString } from '~/utils';
import StickyHeader from './StickyHeader';

export default function Header({ shadow }: { shadow?: boolean }) {
  const { appSettings } = useRootLoaderData();

  return (
    <>
      <div className='bg-[--main-color] text-white text-center py-2'>
        <ul className='container !flex items-center justify-center md:justify-end gap-6 text-xs'>
          <li className='flex items-center gap-2'>
            <div className='rounded-full border p-1'>
              <RiTimeLine size={16} />
            </div>

            <span>Thứ Hai - Chủ Nhật 8:00 - 21:00</span>
          </li>

          <li className='hidden md:flex items-center gap-2'>
            <div className='rounded-full border p-1'>
              <RiPhoneLine size={16} />
            </div>

            <span>
              <a
                className='hover:underline'
                href={`tel:${appSettings.app_msisdn}`}
              >
                {appSettings.app_msisdn}
              </a>
            </span>
          </li>

          <li className=' items-center gap-2 hidden lg:flex'>
            <div className='rounded-full border p-1'>
              <RiMapPinLine size={16} />
            </div>

            <span>{toAddressString(appSettings.app_address)}</span>
          </li>
        </ul>
      </div>

      <StickyHeader shadow={shadow} />
    </>
  );
}
