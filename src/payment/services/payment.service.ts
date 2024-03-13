import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Order, OrderItem, Point } from '../entities';
//import { CreateOrderDto } from '../dto/create-order.dto';
import { BusinessException } from '../../exception';
import { ProductService } from './product.service';
import {
  IssuedCouponRepository,
  // OrderRepository,
  PointRepository,
  PointLogRepository,
  //ShippingInfoRepository,
} from '../repositories';
import { Transactional } from 'typeorm-transactional';
import { TokenPayload } from 'src/auth/types';

@Injectable()
export class PaymentService {
  constructor(
    private readonly issuedCouponRepo: IssuedCouponRepository,
    private readonly pointRepo: PointRepository,
    private readonly pointLogRepo: PointLogRepository,
    private readonly productService: ProductService,
    // private readonly shippingInfoRepo: ShippingInfoRepository,
    //private readonly orderRepo: OrderRepository,
  ) {}

  // 포인트 충전
  @Transactional()
  async addPoint(data: any, payload: TokenPayload): Promise<any> {
    if (data.status === '200') {
      const reason = '충전';
      const amount = data.amount;
      const log = await this.pointLogRepo.addPointLog(amount, reason);
      const point = await this.pointRepo.addPoint(amount, payload);
    } else {
      throw new HttpException('결제를 다시 해주세요.', HttpStatus.BAD_REQUEST);
    }
    return data;
  }

  // PG사 연결 즉시 결제
  async paymentPg(point: Point): Promise<Point> {
    return;
  }

  // 주문 금액 계산
  //   async initOrder(dto: CreateOrderDto): Promise<Order> {
  //     return;
  //   }

  //   async confirmPayment(paymentData: any) {
  //     const { paymentKey, orderId, amount } = paymentData;
  //     const widgetSecretKey = 'YOUR_Toss_Payments_API_KEY';
  //     const encryptedSecretKey = `Basic ${Buffer.from(widgetSecretKey + ':').toString('base64')}`;

  //     try {
  //       const response = this.httpService.post('https://api.tosspayments.com/v1/payments/confirm', {
  //         headers: {
  //           Authorization: encryptedSecretKey,
  //           'Content-Type': 'application/json',
  //         },
  //         json: {
  //           orderId: orderId,
  //           amount: amount,
  //           paymentKey: paymentKey,
  //         },
  //         responseType: 'json',
  //       });

  //       return await this.pointRepo.addPoint(response.data)
  //     } catch (error) {
  //       throw new Error(error.response.body);
  //     }
  //   }

  // 상품의 총 금액 계산
  private async calculateTotalAmount(orderItems: OrderItem[]): Promise<number> {
    let totalAmount = 0;
    return;
  }

  // 할인 승인
  private async applyDiscounts(
    totalAmount: number,
    userId: string,
    couponId?: string,
    pointAmountToUse?: number,
  ): Promise<number> {
    return;
  }

  // 쿠폰 승인
  private async applyCoupon(
    couponId: string,
    userId: string,
    totalAmount: number,
  ): Promise<number> {
    return;
  }

  // 포인트 승인
  private async applyPoints(
    pointAmountToUse: number,
    userId: string,
  ): Promise<number> {
    return;
  }
}
