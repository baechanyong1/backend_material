import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entity';

export type ProductStatus = 'available' | 'out-of-stock';
// export type Category = 'grocery' | 'clothing' | 'products';
export enum Category {
  grocery = 'grocery',
  clothing = 'clothing',
  products = 'products',
}

@Entity()
export class Product extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ type: 'enum', nullable: true, default: 'product' })
  category: Category;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  imageUrl: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 50, default: 'available' })
  status: ProductStatus;
}
