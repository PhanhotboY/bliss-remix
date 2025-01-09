import { Link, useNavigate, useNavigation } from '@remix-run/react';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import LoadingOverlay from '~/components/LoadingOverlay';
import { IOrder } from '~/interfaces/order.interface';
import { toAddressString } from '~/utils';

export default function OrderList({ orders }: { orders: Array<IOrder> }) {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    switch (navigation.state) {
      case 'loading':
        setLoading(true);
        break;
      default:
        setLoading(false);
        break;
    }
  }, [navigation.state]);

  return (
    <>
      <table className='table-auto col-span-12'>
        <thead className=''>
          <tr className=''>
            <th className='p-3 font-bold uppercase bg-zinc-200 border hidden lg:table-cell'>
              Tên
            </th>

            <th className='p-3 font-bold uppercase bg-zinc-200 border hidden lg:table-cell'>
              Thời gian đặt
            </th>

            <th className='p-3 font-bold uppercase bg-zinc-200 border hidden lg:table-cell'>
              Số điện thoại
            </th>

            <th className='p-3 font-bold uppercase bg-zinc-200 border hidden lg:table-cell'>
              Tổng tiền
            </th>

            <th className='p-3 font-bold uppercase bg-zinc-200 border hidden lg:table-cell'>
              Địa chỉ
            </th>

            <th className='p-3 font-bold uppercase bg-zinc-200 border hidden lg:table-cell'>
              Tình trạng
            </th>
          </tr>
        </thead>

        <tbody>
          {orders.map((bok, i) => (
            <tr
              key={i}
              className='bg-white lg:hover:bg-zinc-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0'
            >
              <td className='w-full lg:w-auto text-center border border-b block lg:table-cell relative lg:static hover:underline hover:text-[--main-color] hover:cursor-pointer'>
                <Link
                  to={`/cmsdesk/orders/${bok.id}`}
                  className='block p-3 w-full h-full'
                >
                  <span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>
                    Tên
                  </span>
                  {bok.ord_name}
                </Link>
              </td>

              <td className='w-full lg:w-auto p-3 text-center border border-b block lg:table-cell relative lg:static'>
                <span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>
                  Thời gian đặt
                </span>
                {(() => {
                  try {
                    return format(new Date(bok.createdAt), 'hh:mm, dd/MM/yyyy');
                  } catch (error) {
                    return bok.createdAt;
                  }
                })()}
              </td>

              <td className='w-full lg:w-auto p-3 text-center border border-b block lg:table-cell relative lg:static'>
                <span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>
                  Số điện thoại
                </span>
                {bok.ord_msisdn}
              </td>

              <td className='w-full lg:w-auto p-3 text-center border border-b block lg:table-cell relative lg:static'>
                <span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>
                  Tổng tiền
                </span>
                {bok.ord_sum.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </td>

              <td className='w-full lg:w-auto p-3 text-center border border-b block lg:table-cell relative lg:static'>
                <span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>
                  Địa chỉ
                </span>
                {toAddressString(bok.ord_address)}
              </td>

              {/* <td className='w-full lg:w-auto p-3 text-center border border-b block lg:table-cell relative lg:static'>
                <span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>
                  Tình trạng
                </span>
                {bok.bok_viewed ? (
                  <p className='m-auto w-fit bg-green rounded px-2 py-1 text-xs font-bold text-[--sub3-text]'>
                    Đã xem
                  </p>
                ) : (
                  <p className='m-auto w-fit rounded bg-red px-2 py-1 text-xs font-bold text-[--sub3-text]'>
                    Chưa xem
                  </p>
                )}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>

      {loading && <LoadingOverlay />}
    </>
  );
}
