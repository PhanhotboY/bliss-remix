export interface IOrder {
  id: string;
  ord_name: string;
  ord_msisdn: string;
  ord_sum: number;
  ord_address: {
    province: string;
    district: string;
    ward: string;
    street: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IOrderDetail extends IOrder {
  ord_discount: number;
  ord_products: [{ id: string; quantity: number }];
}
