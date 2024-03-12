import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CouponRepository,
  IssuedCouponRepository,
  // OrderItemRepository,
  //OrderRepository,
  //PointLogRepository,
  //PointRepository,
  ProductRepository,
  //ShippingInfoRepository,
} from './repositories';
import {
  Coupon,
  IssuedCoupon,
  // Order,
  //OrderItem,
  //Point,
  //PointLog,
  Product,
  //ShippingInfo,
} from './entities';
import { AuthModule } from '../auth/auth.module';
import {
  CouponService,
  //PaymentService,
  ProductService,
} from './services';
import { Category } from './entities/product.entity';
import { couponController } from './controller/coupon.controller';
import { ProductController } from './controller/product.controller';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      // Order,
      // OrderItem,
      // ShippingInfo,
      // Point,
      // PointLog,
      Coupon,
      IssuedCoupon,
      Product,
    ]),
  ],
  controllers: [couponController, ProductController],
  providers: [
    //PaymentService,
    ProductService,
    CouponService,
    // OrderRepository,
    // OrderItemRepository,
    // ShippingInfoRepository,
    ProductRepository,
    CouponRepository,
    IssuedCouponRepository,
    //  PointRepository,
    //  PointLogRepository,
  ],
})
export class PaymentModule {}
