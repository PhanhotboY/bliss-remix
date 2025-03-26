import { ActionFunctionArgs } from '@remix-run/node';
import { createBooking } from '~/services/booking.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  switch (request.method) {
    case 'POST': {
      const body = new URLSearchParams(await request.text());
      const name = body.get('name');
      const msisdn = body.get('msisdn');
      const branch = body.get('branch');

      const res = await createBooking({
        name,
        msisdn,
        branch,
        viewed: false,
      });

      return { toast: { message: 'Đặt lịch thành công!', type: 'success' } };
    }

    default: {
      return { toast: { message: 'Method not allowed', type: 'error' } };
    }
  }
};
