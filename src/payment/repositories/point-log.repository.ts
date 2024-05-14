import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async addPointLog(amount: number, reason: string): Promise<PointLog> {
    console.log('로그', amount, reason);
    const pointLog = new PointLog();
    pointLog.amount = amount;
    pointLog.reason = reason;

    if (pointLog.reason === 'earn') {
      pointLog.add(amount, reason);
      console.log('충전', pointLog);
    } else if (pointLog.reason === '사용') {
      pointLog.use(amount, reason);
    } else {
      throw new HttpException(
        '포인트 로그 저장에 실패했습니다',
        HttpStatus.BAD_REQUEST,
      );
    }
    console.log('로그 끝', pointLog);
    return await this.repo.save(pointLog);
  }
}
