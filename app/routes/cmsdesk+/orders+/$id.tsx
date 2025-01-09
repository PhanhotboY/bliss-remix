import { json, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { authenticator } from '~/services/auth.server';
import { getOrderDetail } from '~/services/order.server';
import { useLoaderData, useNavigate, useRevalidator } from '@remix-run/react';
import OrderDetail from '~/widgets/OrderDetail';

// export const action = async ({ request, params }: ActionFunctionArgs) => {
//   const user = await authenticator.isAuthenticated(request);
//   if (!user) {
//     return json(null, { status: 401 });
//   }

//   const { id } = params;
//   const { viewed } = (await request.json()) as any;

//   try {
//     // const res = await setViewedBooking(id || '', !!viewed, user);
//     return json(res);
//   } catch (error) {
//     console.error('Error setting viewed order:', error);
//     return json(null, { status: 500 });
//   }
// };

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request);
  if (!user) {
    return json({ order: null }, { status: 401 });
  }

  try {
    if (!params.id) {
      throw new Response(null, { status: 400 });
    }
    const order = await getOrderDetail(params.id, user);
    return json({ order });
  } catch (error) {
    console.error('Error loading order detail:', error);
    return json({ order: null });
  }
};

export default function BookingDetailPopup() {
  const { order } = useLoaderData<typeof loader>() as any;
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  return (
    <OrderDetail
      order={order}
      popupHidder={() => {
        navigate(-1);
        revalidator.revalidate();
      }}
    />
  );
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { order } = data || {};
  return [{ title: `${order?.ord_name}` }];
};
