import { LoaderFunctionArgs } from '@remix-run/node';
import { json, Outlet, useLoaderData } from '@remix-run/react';
import { authenticator } from '~/services/auth.server';
import { getOrders } from '~/services/order.server';
import BookingList from '~/widgets/BookingList';
import OrderList from '~/widgets/OrderList';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const user = await authenticator.isAuthenticated(request);
    if (!user) {
      throw new Response(null, { status: 401 });
    }
    const orders = await getOrders(user);

    return json({
      orders,
    });
  } catch (error) {
    console.error('Error loading orders:', error);
    return json({ orders: [] });
  }
};

export default function ManageOrders() {
  const { orders } = useLoaderData<typeof loader>();

  return (
    <div>
      <OrderList orders={orders} />

      <Outlet />
    </div>
  );
}
