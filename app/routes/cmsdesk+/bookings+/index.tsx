import { useState } from 'react';
import { json, LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, useLoaderData, useNavigate } from '@remix-run/react';

import { authenticator } from '~/services/auth.server';
import LoadingOverlay from '~/components/LoadingOverlay';
import { getBookings } from '~/services/booking.server';
import HandsomeError from '~/components/HandsomeError';
import BookingList from '~/widgets/BookingList';
import BookingDetail from '~/widgets/BookingDetail';
import { IBooking } from '~/interfaces/booking.interface';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const user = await authenticator.isAuthenticated(request);
    if (!user) {
      throw new Response(null, { status: 401 });
    }
    const bookings = await getBookings(user);

    return json({
      bookings,
    });
  } catch (error) {
    console.error('Error loading bookings:', error);
    return json({ bookings: [] });
  }
};

export default function BookingManager() {
  const { bookings } = useLoaderData<typeof loader>();

  return (
    <div className='container grid grid-cols-12 gap-4'>
      <BookingList bookings={bookings} />

      <Outlet />
    </div>
  );
}

export const ErrorBoundary = () => <HandsomeError />;
