import { Controller, Body, Post, Req, Get, Param } from '@nestjs/common';
import { CreateCouponDto, CreateIssuedCouponDto } from '../dto';
import { CouponService } from '../services/coupon.service';
import { Coupon, IssuedCoupon } from '../entities';
import { TokenPayload } from 'src/auth/types';

@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  //쿠폰 생성
  @Post('')
  async create(@Body() createCouponDto: CreateCouponDto): Promise<Coupon> {
    return await this.couponService.createCoupon(createCouponDto);
  }

  // 사용자 쿠폰 등록
  @Post('id')
  async register(
    @Req() payload: TokenPayload,
    @Param() id: string,
    @Body() createIssuedCouponDto: CreateIssuedCouponDto,
  ): Promise<IssuedCoupon> {
    return await this.couponService.register(
      id,
      createIssuedCouponDto,
      payload,
    );
  }

  //쿠폰 조회
  @Get('')
  async findAll(): Promise<Coupon[]> {
    return await this.couponService.getCoupons();
  }
}
