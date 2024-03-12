export type CreateIssuedCouponDto = {
  // isValid: boolean;
  // isUsed: boolean;
  validFrom: number;
  validUntil: number;
  user: {
    id: string;
  };
};
