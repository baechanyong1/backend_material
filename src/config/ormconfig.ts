import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { AccessLog, AccessToken, RefreshToken, User } from 'src/auth/entities';
import {
  Coupon,
  IssuedCoupon,
  Order,
  OrderItem,
  Point,
  PointLog,
  Product,
  ShippingInfo,
} from 'src/payment/entities';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234aaaa',
      database: 'backend_material',
      entities: [
        User,
        AccessToken,
        RefreshToken,
        AccessLog,
        Coupon,
        Point,
        IssuedCoupon,
        Product,
        PointLog,
        Order,
        OrderItem,
        ShippingInfo,
      ],
      //entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    };
  }
}
