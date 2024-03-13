import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { BaseEntity } from '../../common/entity';
import { IssuedCoupon } from './issued-coupon.entity';
import { Category as ProductCategory } from './product.entity'; // Alias로 명시

type CouponType = 'percent' | 'fixed';

@Entity()
export class Coupon extends BaseEntity {
  @Column({ type: 'varchar', length: 50 })
  type: CouponType;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  value: number;

  @OneToMany(() => IssuedCoupon, (issuedCoupon) => issuedCoupon.coupon)
  issuedCoupons: Relation<IssuedCoupon[]>;

  // Enum 정보 추가
  @Column({
    type: 'enum',
    enum: ProductCategory,
    nullable: true,
    default: ProductCategory.products,
  })
  category: ProductCategory; // Product 엔터티의 Category를 사용
}
