import { Controller, Body, Post, Req, Get, Param } from '@nestjs/common';
import { CreateCouponDto, CreateIssuedCouponDto } from '../dto';
import { CouponService } from '../services/coupon.service';
import { Coupon, IssuedCoupon } from '../entities';
import { TokenPayload } from 'src/auth/types';

@Controller('coupon')
export class couponController {
  constructor(private readonly couponService: CouponService) {}

  //쿠폰 생성
  @Post('')
  async create(@Body() createCouponDto: CreateCouponDto): Promise<Coupon> {
    // const { type, value, category, issuedCoupon } = createCouponDto;

    // return await this.couponService.createCoupon({
    //   type,
    //   value,
    //   category,
    //   issuedCoupon: {
    //     validFrom: Date.now(),
    //     validUntil: Date.now() + issuedCoupon.validUntil * 60 * 60 * 1000,
    //     // validUntil 즉 만료시간을 시간 단위로 받아서 해당 시간 뒤 만료되게 계산
    //   },
    // });
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
