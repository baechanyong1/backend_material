import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Coupon, IssuedCoupon } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCouponDto } from '../dto/create-coupon.dto';

@Injectable()
export class CouponRepository extends Repository<Coupon> {
  constructor(
    @InjectRepository(Coupon)
    private readonly repo: Repository<Coupon>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  async findCoupon(): Promise<Coupon[]> {
    const coupon = await this.repo.find();
    return coupon;
  }

  async findCouponById(couponId: string): Promise<Coupon> {
    console.log(couponId);
    return await this.repo.findOneBy({ id: couponId });
  }

  async createCoupon(dto: CreateCouponDto): Promise<Coupon> {
    const coupon = this.create({
      type: dto.type,
      value: dto.value,
      category: dto.category,
    } as Coupon);

    await this.save(coupon);
    return coupon;
  }
}
