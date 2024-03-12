import { Injectable } from '@nestjs/common';
import { IssuedCoupon } from '../entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateIssuedCouponDto } from '../dto';
import { TokenPayload } from '../../auth/types';

@Injectable()
export class IssuedCouponRepository extends Repository<IssuedCoupon> {
  constructor(
    @InjectRepository(IssuedCoupon)
    private readonly repo: Repository<IssuedCoupon>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  async createIssuedCoupon(
    dto: CreateIssuedCouponDto,
    payload: TokenPayload,
  ): Promise<IssuedCoupon> {
    const oneWeekLater = new Date();
    oneWeekLater.setDate(oneWeekLater.getDate() + 7);

    const coupon = this.create({
      user: {
        id: payload.sub,
      },
      validFrom: Date.now(),
      validUntil: oneWeekLater,
    });
    await this.save(coupon);
    return coupon;
  }
}
