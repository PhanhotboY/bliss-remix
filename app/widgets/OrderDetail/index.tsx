import { format } from 'date-fns';
import { IOrder } from '~/interfaces/order.interface';

export default function OrderDetail({
  order,
  popupHidder,
}: {
  order: IOrder;
  popupHidder: () => void;
}) {
  return (
    <div
      className='fixed inset-0 z-50 bg-black/65 flex items-center'
      onClick={popupHidder}
    >
      <div
        className='bg-white w-1/2 rounded-lg flex flex-col p-4 mx-auto h-fit space-y-4'
        onClick={(e) => e.stopPropagation()}
      >
        <p className=''>
          <b>Tên: </b>
          {order.ord_name}
        </p>

        <p>
          <b>Số điện thoại: </b>
          {order.ord_msisdn}
        </p>

        <p>
          <b>Thời gian đặt: </b>
          {(() => {
            try {
              return format(new Date(order.createdAt), 'dd/MM/yyyy');
            } catch (error) {
              return order.createdAt;
            }
          })()}
        </p>

        <p>
          <b>Thời gian cập nhật: </b>
          {(() => {
            try {
              return format(new Date(order.updatedAt), 'hh:mm, dd/MM/yyyy');
            } catch (error) {
              return order.updatedAt;
            }
          })()}
        </p>

        {order.ord_sum ? (
          <button
            className='center rounded-lg bg-red py-2 px-3 font-sans font-bold uppercase text-white 
          shadow-md shadow-red/20 transition-all hover:shadow-lg enable:active:bg-red/80 
          disabled:opacity-60'
            type='button'
            onClick={() => {
              fetch(`/cmsdesk/orders/${order.id}`, {
                method: 'PUT',
                body: JSON.stringify({ viewed: false }),
              });
              popupHidder();
            }}
          >
            Đánh dấu chưa đọc
          </button>
        ) : (
          <button
            className='center rounded-lg bg-green py-2 px-3 font-sans font-bold uppercase text-white 
        shadow-md shadow-green/20 transition-all hover:shadow-lg enable:active:bg-green/80 
        disabled:opacity-60'
            type='button'
            onClick={() => {
              fetch(`/cmsdesk/orders/${order.id}`, {
                method: 'PUT',
                body: JSON.stringify({ viewed: true }),
              });
              popupHidder();
            }}
          >
            Đánh dấu đã đọc
          </button>
        )}
      </div>
    </div>
  );
}
