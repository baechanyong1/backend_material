import { Category } from '../entities';

export type CreateCouponDto = {
  type: string;
  value: number;
  category: Category;
  // issuedCoupon: {
  //   validFrom: number;
  //   validUntil: number;
  // };
};
