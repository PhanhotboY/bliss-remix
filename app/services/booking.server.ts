import { ISessionUser } from '~/interfaces/auth.interface';
import { fetcher } from '.';
import { IBooking, IBookingDetail } from '~/interfaces/booking.interface';

const getBookings = async (request: ISessionUser) => {
  const res = await fetcher(`/bookings`, { request });
  return res as Array<IBooking>;
};

const getBookingDetail = async (bookingId: string, request: ISessionUser) => {
  const res = await fetcher(`/bookings/${bookingId}`, { request });
  return res as IBookingDetail;
};

const countUnseenBookings = async (request: ISessionUser) => {
  const res = await fetcher(`/bookings/count`, { request });
  return res;
};

const createBooking = async (data: any) => {
  const res = await fetcher(`/bookings`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return res;
};

const updateBooking = async (
  bookingId: string,
  data: any,
  request: ISessionUser
) => {
  const res = await fetcher(`/bookings/${bookingId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    request,
  });
  return res;
};

const setViewedBooking = async (
  bookingId: string,
  viewed: boolean,
  request: ISessionUser
) => {
  const res = await fetcher(`/bookings/${bookingId}`, {
    method: 'PUT',
    body: JSON.stringify({ viewed }),
    request,
  });
  return res;
};

const deleteBooking = async (bookingId: string, request: ISessionUser) => {
  const res = await fetcher(`/bookings/${bookingId}`, {
    method: 'DELETE',
    request,
  });
  return res;
};

export {
  getBookings,
  getBookingDetail,
  createBooking,
  updateBooking,
  deleteBooking,
  setViewedBooking,
  countUnseenBookings,
};
