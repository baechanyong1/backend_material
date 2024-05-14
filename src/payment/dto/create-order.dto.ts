import { OrderItem } from '../entities';

export type CreateOrderDto = {
  orderItems: OrderItem[];

  couponId: string;

  address: string;

  //hippingCompany : string
};
