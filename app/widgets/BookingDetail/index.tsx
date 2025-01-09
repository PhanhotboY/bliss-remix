import { format } from 'date-fns';
import { IBooking } from '~/interfaces/booking.interface';

export default function BookingDetail({
  booking,
  popupHidder,
}: {
  booking: IBooking;
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
          {booking.bok_name}
        </p>

        <p>
          <b>Số điện thoại: </b>
          {booking.bok_msisdn}
        </p>

        <p>
          <b>Email: </b>
          {booking.bok_email}
        </p>

        <p>
          <b>Thời gian liên hệ: </b>
          {booking.bok_time2Call}
        </p>

        <p>
          <b>Ngày liên hệ: </b>
          {(() => {
            try {
              return format(new Date(booking.bok_date2Call), 'dd/MM/yyyy');
            } catch (error) {
              return booking.bok_date2Call;
            }
          })()}
        </p>

        <div>
          <b>Trạng thái: </b>
          {booking.bok_viewed ? (
            <p className='inline w-fit lg:hidden absolute top-0 left-0 bg-green px-2 py-1 text-xs font-bold uppercase text-[--sub6-text]'>
              Đã xem
            </p>
          ) : (
            <p className='inline w-fit rounded bg-red py-1 px-3 text-xs font-bold text-[--sub6-text]'>
              Chưa xem
            </p>
          )}
        </div>

        <p>
          <b>Thời gian cập nhật: </b>
          {(() => {
            try {
              return format(new Date(booking.updatedAt), 'hh:mm, dd/MM/yyyy');
            } catch (error) {
              return booking.updatedAt;
            }
          })()}
        </p>

        {booking.bok_viewed ? (
          <button
            className='center rounded-lg bg-red py-2 px-3 font-sans font-bold uppercase text-white 
          shadow-md shadow-red/20 transition-all hover:shadow-lg enable:active:bg-red/80 
          disabled:opacity-60'
            type='button'
            onClick={() => {
              fetch(`/cmsdesk/bookings/${booking.id}`, {
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
              fetch(`/cmsdesk/bookings/${booking.id}`, {
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
