import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Order, OrderItem, Point, ShippingInfo } from '../entities';
import { CreateOrderDto, CreateShippingInfoDto } from '../dto';
import { BusinessException } from '../../exception';
import { ProductService } from './product.service';
import {
  IssuedCouponRepository,
  // OrderRepository,
  PointRepository,
  PointLogRepository,
  ShippingInfoRepository,
  CouponRepository,
  ProductRepository,
  OrderRepository,
} from '../repositories';
import { Transactional } from 'typeorm-transactional';
import { TokenPayload } from 'src/auth/types';

@Injectable()
export class PaymentService {
  constructor(
    private readonly issuedCouponRepo: IssuedCouponRepository,
    private readonly pointRepo: PointRepository,
    private readonly pointLogRepo: PointLogRepository,
    private readonly productRepo: ProductRepository,
    private readonly productService: ProductService,
    private readonly couponRepo: CouponRepository,
    private readonly shippingInfoRepo: ShippingInfoRepository,
    private readonly orderRepo: OrderRepository,
  ) {}

  // 포인트 충전
  @Transactional()
  async addPoint(data: any, payload: TokenPayload): Promise<any> {
    console.log('포인트', data);
    if (data.status === 'DONE') {
      const reason = 'earn';
      const amount = data.totalAmount;
      console.log('amount', amount);
      const point = await this.pointRepo.addPoint(amount, payload);
      console.log('point', point);
      const log = await this.pointLogRepo.addPointLog(amount, reason);
      console.log('충전중', log);
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
  // 총 금액 18원 할인 30% = 13원 정상 결제 확인
  // 포인트 사용시 로그 2번 작성 수정
  @Transactional()
  async initOrder(dto: CreateOrderDto, payload: any): Promise<Order> {
    const address = dto.address;
    const userId = payload;
    const couponIds = Array.isArray(dto.couponId)
      ? dto.couponId
      : [dto.couponId];
    const shippingInfo: CreateShippingInfoDto = {
      address: address,
    };
    const amount = await this.calculateTotalAmount(dto.orderItems);
    const applyCoupon = await this.applyCoupon(couponIds, payload);
    const applyDiscounts = await this.applyDiscounts(
      amount,
      applyCoupon.coupon,
    );
    // 포인트만 미구현
    const applyPoints = await this.applyPoints(applyDiscounts, payload);
    const order = await this.orderRepo.createOrder({
      dto,
      userId: payload,
      amount,
    });
    const shipping = await this.setShipping(shippingInfo);
    return order;
    // {
    //   user: payload.sub,
    //   orderNo: '',
    //   amount: amount,
    //   status: order.status,
    //   items: [],
    //   pointAmountUsed: applyPoints,
    //   usedIssuedCoupon: applyCoupon,
    //   shippingInfo: shipping,
    //   refundReason: '',
    //   refundedAmount: 0,
    //   refundedAt: null,
    //   pgMetadata: null,
    // };
  }

  async setShipping(dto: any): Promise<ShippingInfo> {
    if (dto.shippingId) {
      const shippingInfo = await this.shippingInfoRepo.findOneBy({
        id: dto.shippingId,
      });
      shippingInfo.status = 'ordered';
      shippingInfo.trackingNumber = dto.trackingNumber;
      shippingInfo.shippingCompany = dto.shippingCompany;
      shippingInfo.address = dto.address;
      await this.shippingInfoRepo.createShippingInfo(shippingInfo);
      console.log('Shipping1', shippingInfo);
      return shippingInfo;
    } else {
      const shippingInfo = await this.shippingInfoRepo.createShippingInfo(dto);
      console.log('Shipping2', shippingInfo);
      return shippingInfo;
    }
    //판매자가 주문 상태를 지정하는 함수
  }

  // 상품의 총 금액 계산
  private async calculateTotalAmount(orderItems: OrderItem[]): Promise<number> {
    let totalAmount = 0;
    for (const orderItem of orderItems) {
      const product = await this.productRepo.findProduct(orderItem.productId);
      totalAmount += product.price * orderItem.quantity;
    }
    console.log('Total amount', totalAmount);
    return totalAmount;
  }

  // 할인 승인
  private async applyDiscounts(
    totalAmount: number,
    applyCoupon: any,
  ): Promise<number> {
    const type = applyCoupon.type;

    let discount = 0;
    if (type === 'percent') {
      const percentDiscount = totalAmount * (applyCoupon.value / 100);
      discount = Math.floor(percentDiscount);
      totalAmount -= discount;
    }
    if (type === 'fixed') {
      const fixedDiscount = applyCoupon.value;
      discount = Math.floor(fixedDiscount);
      totalAmount -= discount;
    }
    return totalAmount;
  }

  // 쿠폰 승인
  private async applyCoupon(couponId: string[], userId: string) {
    // 쿠폰 조회하기
    if (couponId) {
      // 발급된 쿠폰 찾기
      const issuedCoupon = await this.issuedCouponRepo.findIssuedCoupon(
        userId,
        couponId,
      );
      // 발급된 쿠폰가 존재하는 경우
      if (issuedCoupon) {
        // 발급된 쿠폰 정보 반환
        console.log('issuedCoupon', issuedCoupon);
        return issuedCoupon;
      }
    }
    console.log('Not_issuedCoupon');
    // 쿠폰이 존재하지 않거나 잘못된 경우 undefined 반환
    return undefined;
  }

  // 포인트 승인
  private async applyPoints(
    pointAmountToUse: number,
    userId: string,
  ): Promise<Point> {
    // 포인트 조회
    const point = await this.pointRepo.findPoint(userId);
    console.log('포인트승인', pointAmountToUse, point);
    const reason = '사용';
    const remainingPoint = point.availableAmount - pointAmountToUse;
    console.log('remainingPoint', remainingPoint);

    point.availableAmount = remainingPoint;
    const usedPoint = await this.pointRepo.usePoint(pointAmountToUse, userId);
    await this.pointLogRepo.addPointLog(pointAmountToUse, reason);
    return usedPoint ? usedPoint : undefined;
  }
}
