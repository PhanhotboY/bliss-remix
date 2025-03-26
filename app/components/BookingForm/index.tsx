import { useFetcher, useLoaderData } from '@remix-run/react';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useRootLoaderData } from '~/lib/useRootLoaderData';
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
  const { branches } = useRootLoaderData();

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
            htmlFor='branch'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Chọn chi nhánh*
          </label>
          <select
            id='branch'
            name='branch'
            required
            className='w-full border border-gray-300 rounded-lg p-2 focus:ring-red-500 focus:border-red-500'
          >
            <option value='' disabled>
              Chọn chi nhánh
            </option>
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.bra_name}
              </option>
            ))}
          </select>
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
