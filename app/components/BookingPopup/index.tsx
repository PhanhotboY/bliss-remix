import { useEffect } from 'react';

import BookingForm from '../BookingForm';
import { useRootLoaderData } from '~/lib/useRootLoaderData';

export default function BookingPopup({ hidePopup }: { hidePopup: () => void }) {
  const { appSettings } = useRootLoaderData();

  useEffect(() => {
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.height = 'auto';
      document.body.style.overflowY = 'auto';
    };
  }, []);

  return (
    <div
      className='fixed inset-0 bg-black/70 flex h-full z-50 p-8 overflow-y-auto'
      onClick={hidePopup}
    >
      <section className='container h-fit' onClick={(e) => e.stopPropagation()}>
        <div
          className='col-span-12 grid grid-cols-12 gap-8 p-8 rounded-xl'
          style={{
            background:
              "url('/assets/popup-bg.png') no-repeat center center/cover",
          }}
        >
          <div className='hidden lg:flex col-span-5 flex-col items-center p-4 gap-4 rounded-xl bg-[--sub4-color] text-[--sub11-text]'>
            <div className='w-60 mx-auto'>
              <img src='/assets/telephone.png' alt='telephone icon' />
            </div>

            <p className='capitalize text-2xl font-bold'>Liên Hệ Hotline</p>

            <p className='text-3xl font-semibold'>{appSettings.app_msisdn}</p>

            <p>Giải quyết câu hỏi của khách hàng</p>

            <div className='w-60 mx-auto'>
              <img src='/assets/calendar.png' alt='calendar icon' />
            </div>

            <p className='capitalize font-bold text-2xl'>Đặt Lịch Hẹn</p>

            <p className='uppercae font-semibold text-3xl'>NHẬN NGAY ƯU ĐÃI</p>

            <p>Đặt lịch hôm nay để nhận ngay ưu đãi duy nhất</p>
          </div>

          <BookingForm className='col-span-12 lg:col-span-7' concise />
        </div>
      </section>
    </div>
  );
}
