import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ShippingInfo } from '../entities';
import { CreateShippingInfoDto } from '../dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ShippingInfoRepository extends Repository<ShippingInfo> {
  constructor(
    @InjectRepository(ShippingInfo)
    private readonly repo: Repository<ShippingInfo>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  async createShippingInfo(data: CreateShippingInfoDto): Promise<ShippingInfo> {
    const shippingInfo = this.create(data);
    await this.save(shippingInfo);
    return shippingInfo;
  }

  async findShippingInfo(data: any): Promise<ShippingInfo> {
    return;
  }
}
