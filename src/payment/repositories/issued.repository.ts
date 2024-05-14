import { Injectable } from '@nestjs/common';
import { IssuedCoupon } from '../entities';
import { In, Repository } from 'typeorm';
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

  async createIssuedCoupon(id: string, payload: any): Promise<IssuedCoupon> {
    const oneWeekLater = new Date();
    oneWeekLater.setDate(oneWeekLater.getDate() + 7);

    const coupon = this.create({
      user: {
        id: payload,
      },
      coupon: {
        id: id,
      },
      validFrom: new Date(),
      validUntil: oneWeekLater,
    });
    await this.save(coupon);
    return coupon;
  }

  async findIssuedCoupon(
    userId: string,
    couponIds: string[],
  ): Promise<IssuedCoupon | undefined> {
    console.log(couponIds, '쿠폰아이디');
    return await this.createQueryBuilder('issuedCoupon')
      .leftJoinAndSelect('issuedCoupon.user', 'user')
      .leftJoinAndSelect('issuedCoupon.coupon', 'coupon')
      .where('user.id = :userId', { userId })
      .andWhere('coupon.id IN (:...couponIds)', { couponIds })
      .getOne();
  }
}
