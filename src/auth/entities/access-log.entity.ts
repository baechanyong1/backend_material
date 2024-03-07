import { Column, Entity, ManyToOne, Relation } from 'typeorm';
import { BaseEntity } from '../../common/entity';
import { User } from './user.entity';

@Entity()
export class AccessLog extends BaseEntity {
  @Column({ type: 'varchar', length: 512, nullable: true })
  ua: string;

  @Column()
  endpoint: string;

  @Column()
  ip: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  accessedAt: Date;

  @Column({ type: 'varchar', length: 512, nullable: true })
  userAgent: string; // 브라우저 정보 추가

  @ManyToOne(() => User, (user) => user.accessLogs, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  user?: Relation<User>;
}
