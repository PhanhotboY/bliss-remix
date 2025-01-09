import { ActionFunctionArgs } from '@remix-run/node';
import { createBooking } from '~/services/booking.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  switch (request.method) {
    case 'POST': {
      const body = new URLSearchParams(await request.text());
      const name = body.get('name');
      const msisdn = body.get('msisdn');
      const email = body.get('email');
      const time2Call = body.get('time2Call');
      const date2Call = body.get('date2Call');
      const message = body.get('message');

      const res = await createBooking({
        name,
        msisdn,
        email,
        time2Call,
        date2Call,
        message,
        viewed: false,
      });

      return { toast: { message: 'Đặt lịch thành công!', type: 'success' } };
    }

    default: {
      return { toast: { message: 'Method not allowed', type: 'error' } };
    }
  }
};
