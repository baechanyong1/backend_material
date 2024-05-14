import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CouponRepository,
  IssuedCouponRepository,
  //OrderItemRepository,
  OrderRepository,
  PointLogRepository,
  PointRepository,
  ProductRepository,
  ShippingInfoRepository,
} from './repositories';
import {
  Coupon,
  IssuedCoupon,
  Order,
  OrderItem,
  Point,
  PointLog,
  Product,
  ShippingInfo,
} from './entities';
import { AuthModule } from '../auth/auth.module';
import { CouponService, PaymentService, ProductService } from './services';
import {
  PaymentController,
  ProductController,
  CouponController,
} from './controller';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      OrderItem,
      ShippingInfo,
      Point,
      PointLog,
      Coupon,
      IssuedCoupon,
      Product,
      Order,
    ]),
  ],
  controllers: [CouponController, ProductController, PaymentController],
  providers: [
    PaymentService,
    ProductService,
    CouponService,
    OrderRepository,
    ShippingInfoRepository,
    ProductRepository,
    CouponRepository,
    IssuedCouponRepository,
    PointRepository,
    PointLogRepository,
  ],
})
export class PaymentModule {}
