import { ISessionUser } from '~/interfaces/auth.interface';
import { fetcher } from '.';
import { IOrder } from '~/interfaces/order.interface';

const getOrders = async (request: ISessionUser) => {
  const orders = await fetcher('/orders', {
    request,
  });
  return orders as Array<IOrder>;
};

const getOrderDetail = async (id: string, request: ISessionUser) => {
  const order = await fetcher(`/orders/${id}`, {
    request,
  });
  return order as IOrder;
};

const createOrder = async (order: any) => {
  const newOrder = await fetcher('/orders', {
    method: 'POST',
    body: JSON.stringify(order),
  });
  return newOrder as IOrder;
};

const updateOrder = async (id: string, order: any, request: ISessionUser) => {
  const updatedOrder = await fetcher(`/orders/${id}`, {
    method: 'PUT',
    request,
    body: JSON.stringify(order),
  });
  return updatedOrder as IOrder;
};

export { getOrders, getOrderDetail, createOrder, updateOrder };
