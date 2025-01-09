import BookingForm from '~/components/BookingForm';
import { useRootLoaderData } from '~/lib/useRootLoaderData';

export default function CTA() {
  const { appSettings } = useRootLoaderData();

  return (
    <section className=''>
      <div
        className='py-12'
        style={{
          background:
            'url("/assets/banner-bottom.png") no-repeat center center/cover',
        }}
      >
        <div className='container'>
          <BookingForm className='col-start-1 sm:col-start-3 md:col-start-7 lg:col-start-9 w-full' />

          <div className='col-span-12 text-2xl uppercase text-3xl text-[--sub9-text] font-bold flex justify-center mt-4 flex-wrap'>
            <h3 className='w-full lg:w-1/2 text-inherit p-4'>
              Hotline Tư vấn & CSKH: {appSettings.app_msisdn}
            </h3>

            <h3 className='w-full lg:w-1/2 text-inherit p-4'>
              nhấn đặt lịch hẹn nhận ngay ưu đãi
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
