import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderRepository extends Repository<Order> {
  constructor(
    @InjectRepository(Order) private readonly repo: Repository<Order>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  async createOrder(dto: any): Promise<Order> {
    console.log('order', dto);

    const order = new Order();
    order.usedIssuedCoupon = dto.dto.issuedCoupon;
    order.items = dto.dto.items;
    order.pointAmountUsed = dto.dto.amount;
    order.status = 'started';
    order.user = dto.dto.userId;
    order.amount = dto.amount;

    // 주문 엔티티 저장
    return await this.repo.save(order);
  }
}
