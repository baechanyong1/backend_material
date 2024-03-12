import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCouponDto } from '../dto/create-coupon.dto';
import { Coupon, IssuedCoupon } from '../entities';
import { CouponRepository, IssuedCouponRepository } from '../repositories';
import { CreateIssuedCouponDto } from '../dto';
import { TokenPayload } from 'src/auth/types';

@Injectable()
export class CouponService {
  constructor(
    private readonly couponRepo: CouponRepository,
    private readonly issuedCouponRepo: IssuedCouponRepository,
  ) {}

  async createCoupon(dto: CreateCouponDto): Promise<Coupon> {
    return await this.couponRepo.createCoupon(dto);
  }

  async getCoupons(): Promise<Coupon[]> {
    return await this.couponRepo.findCoupon();
  }

  async register(
    id: string,
    dto: CreateIssuedCouponDto,
    payload: TokenPayload,
  ): Promise<IssuedCoupon> {
    const coupon = this.couponRepo.findCouponById(id);
    if (!coupon) {
      throw new HttpException(
        '쿠폰을 찾을 수 없습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.issuedCouponRepo.createIssuedCoupon(dto, payload);
  }
}
