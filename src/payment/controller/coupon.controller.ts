import {
  Controller,
  Body,
  Post,
  Req,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CreateCouponDto, CreateIssuedCouponDto } from '../dto';
import { CouponService } from '../services/coupon.service';
import { Coupon, IssuedCoupon } from '../entities';
import { TokenPayload } from 'src/auth/types';
import { AuthGuard } from 'src/auth/middleware/auth.guard';

@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  //쿠폰 생성
  @Post('')
  async create(@Body() createCouponDto: CreateCouponDto): Promise<Coupon> {
    return await this.couponService.createCoupon(createCouponDto);
  }

  // 사용자 쿠폰 등록
  @UseGuards(AuthGuard)
  @Post('issued/:id') // URL에서 id를 파라미터로 받음
  async register(
    @Req() request,
    @Param('id') id: string, // @Param() 데코레이터를 사용하여 URL 파라미터를 받음
  ): Promise<IssuedCoupon> {
    console.log(request.user);
    return await this.couponService.register(id, request.user.id);
  }

  //쿠폰 조회
  @Get('')
  async findAll(): Promise<Coupon[]> {
    return await this.couponService.getCoupons();
  }
}
