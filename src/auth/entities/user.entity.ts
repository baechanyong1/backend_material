import { BaseEntity } from 'src/common/entity/base-entity';
import { Column, Entity, Relation, OneToMany, OneToOne } from 'typeorm';
import { RefreshToken } from './refresh-token.entity';
import { AccessToken } from './access-token.entity';
import { AccessLog } from './access-log.entity';
import { Order, Point } from 'src/payment/entities';

export type UserRole = 'admin' | 'user';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar' })
  role: UserRole;

  @Column({ nullable: true })
  regNo: string;

  @Column({ default: false })
  isPersonalInfoVerified: boolean;

  @OneToMany(() => AccessToken, (token) => token.user)
  accessToken: Relation<AccessToken[]>;

  @OneToMany(() => RefreshToken, (token) => token.user)
  refreshToken: Relation<RefreshToken[]>;

  @OneToMany(() => AccessLog, (log) => log.user)
  accessLogs: Relation<AccessLog[]>;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order;

  @OneToOne(() => Point, (point) => point.user)
  point: Point;
}
