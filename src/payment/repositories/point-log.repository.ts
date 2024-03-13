import { Injectable } from '@nestjs/common';
import { PointLog } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PointLogRepository extends Repository<PointLog> {
  constructor(
    @InjectRepository(PointLog)
    private readonly repo: Repository<PointLog>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  // async addPointLog(data: any): Promise<PointLog> {
  //   const pointLog = new PointLog();
  //   pointLog.point = data.amount;
  //   pointLog.add(data.amount, data.reason);
  //   return this.save(data);
  // }

  async addPointLog(amount: number, reason: string): Promise<PointLog> {
    const pointLog = new PointLog();
    pointLog.amount = amount;
    pointLog.reason = reason;
    pointLog.add(amount, reason);
    return this.save(pointLog);
  }
}
