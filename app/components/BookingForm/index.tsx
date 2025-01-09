import { useFetcher } from '@remix-run/react';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { action } from '~/routes/api+/booking+';

export default function BookingForm({
  className,
  concise,
}: {
  className?: string;
  concise?: boolean;
}) {
  const fetcher = useFetcher<typeof action>();
  const toastIdRef = useRef<any>(null);

  useEffect(() => {
    switch (fetcher.state) {
      case 'submitting':
        toastIdRef.current = toast.loading('Loading...', {
          autoClose: false,
        });

        break;

      case 'idle':
        if (fetcher.data?.toast && toastIdRef.current) {
          const { toast: toastData } = fetcher.data as any;
          toast.update(toastIdRef.current, {
            render: toastData.message,
            type: toastData.type || 'success', // Default to 'success' if type is not provided
            autoClose: 3000,
            isLoading: false,
          });
          toastIdRef.current = null;

          break;
        }

        toast.update(toastIdRef.current, {
          render: fetcher.data?.toast.message,
          autoClose: 3000,
          isLoading: false,
          type: 'error',
        });

        break;
    }
  }, [fetcher.state]);

  return (
    <div
      className={`${className} col-end-13 bg-white p-6 rounded-lg shadow-lg text-[--sub7-text]`}
    >
      <div className='w-full max-w-96 px-16 mx-auto'>
        <img src='/assets/dang-ky.png' alt='dang ky' />
      </div>

      {concise || (
        <div className='w-full my-4 mx-auto'>
          <img src='/assets/nhan-uu-dai.png' alt='nhan uu dai' />
        </div>
      )}

      <fetcher.Form action='/api/booking' method='POST'>
        <div className='mb-4'>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Họ Và Tên*
          </label>
          <input
            type='text'
            id='name'
            name='name'
            placeholder='Nhập họ và tên'
            required
            className='w-full border border-gray-300 rounded-lg p-2 focus:ring-red-500 focus:border-red-500'
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='msisdn'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Số Điện Thoại*
          </label>
          <input
            type='tel'
            id='msisdn'
            name='msisdn'
            pattern='[0-9]{10,11}'
            placeholder='Nhập số điện thoại'
            required
            className='w-full border border-gray-300 rounded-lg p-2 focus:ring-red-500 focus:border-red-500'
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Vui lòng nhập Email (nếu có)
          </label>

          <input
            type='email'
            id='email'
            name='email'
            placeholder='Nhập email'
            className='w-full border border-gray-300 rounded-lg p-2 focus:ring-red-500 focus:border-red-500'
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='date2Call'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Thời gian đặt lịch*
          </label>
          <input
            type='date'
            id='date2Call'
            name='date2Call'
            required
            className='w-full border border-gray-300 rounded-lg p-2 focus:ring-red-500 focus:border-red-500'
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='time2Call'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Báo giờ sau
          </label>
          <select
            id='time2Call'
            name='time2Call'
            defaultValue={''}
            className='w-full border border-gray-300 rounded-lg p-2 focus:ring-red-500 focus:border-red-500 bg-white'
          >
            <option value='' disabled>
              Chọn một tùy chọn
            </option>

            {timeOptions.map((time, i) => (
              <option key={i} value={time.value}>
                {time.label}
              </option>
            ))}
          </select>
        </div>

        <div className='mb-4'>
          <label
            htmlFor='service'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Dịch Vụ Và Lời Nhắn
          </label>
          <textarea
            id='service'
            name='service'
            placeholder='Nhập dịch vụ hoặc lời nhắn'
            className='w-full border border-gray-300 rounded-lg p-2 focus:ring-red-500 focus:border-red-500'
          ></textarea>
        </div>

        <button
          type='submit'
          className='w-full bg-[--main-color] text-white font-semibold py-2 px-4 rounded-full hover:bg-red-600 
          transition'
        >
          Đăng Ký
        </button>
      </fetcher.Form>
    </div>
  );
}

const timeOptions = [
  { value: '08:00', label: '08:00' },
  { value: '08:30', label: '08:30' },
  { value: '09:00', label: '09:00' },
  { value: '09:30', label: '09:30' },
  { value: '10:00', label: '10:00' },
  { value: '10:30', label: '10:30' },
  { value: '11:00', label: '11:00' },
  { value: '11:30', label: '11:30' },
  { value: '12:00', label: '12:00' },
  { value: '12:30', label: '12:30' },
  { value: '13:00', label: '13:00' },
  { value: '13:30', label: '13:30' },
  { value: '14:00', label: '14:00' },
  { value: '14:30', label: '14:30' },
  { value: '15:00', label: '15:00' },
  { value: '15:30', label: '15:30' },
  { value: '16:00', label: '16:00' },
  { value: '16:30', label: '16:30' },
  { value: '17:00', label: '17:00' },
  { value: '17:30', label: '17:30' },
  { value: '18:00', label: '18:00' },
  { value: '18:30', label: '18:30' },
  { value: '19:00', label: '19:00' },
  { value: '19:30', label: '19:30' },
];
