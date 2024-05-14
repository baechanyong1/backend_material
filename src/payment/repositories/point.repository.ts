import { Injectable } from '@nestjs/common';
import { Point, PointLog } from '../entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePointDto } from '../dto';
import { TokenPayload } from 'src/auth/types';
import { PointLogRepository } from './point-log.repository';

// 포인트로그 연결하기
@Injectable()
export class PointRepository extends Repository<Point> {
  constructor(
    @InjectRepository(Point)
    private readonly repo: Repository<Point>,
    private readonly pointLogRepo: PointLogRepository,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  async addPoint(amount: any, payload: any): Promise<Point> {
    console.log('포인트레포', amount, payload);
    const userId = payload;
    const user = this.create({
      user: {
        id: payload,
      },
    });
    const point = await this.findOne({ where: { user: { id: userId } } });
    console.log('포인트레포2', point);
    if (!point) {
      // 만약 point가 없다면 생성
      const newPoint = new Point();
      newPoint.user = user.user;
      newPoint.availableAmount = 0;
      await this.save(newPoint);
      return newPoint;
    }
    // 여기서 point가 정상적으로 저장되지않음
    point.add(amount);
    console.log(point);
    return this.save(point);
  }

  async usePoint(amount: number, userId: string): Promise<Point> {
    const point = await this.repo.findOne({ where: { user: { id: userId } } });
    const reason = '사용';
    if (!point) {
      throw new Error('User point not found');
    }
    point.availableAmount -= amount;
    await this.pointLogRepo.addPointLog(amount, reason);
    return await this.repo.save(point);
  }

  async findPoint(id: string): Promise<Point> {
    const point = await this.repo.findOne({
      relations: ['user'],
      where: { user: { id: id } },
    });
    return point;
  }
}
