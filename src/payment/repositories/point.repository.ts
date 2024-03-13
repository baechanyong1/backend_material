import { Injectable } from '@nestjs/common';
import { Point, PointLog } from '../entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePointDto } from '../dto';
import { TokenPayload } from 'src/auth/types';

@Injectable()
export class PointRepository extends Repository<Point> {
  constructor(
    @InjectRepository(Point)
    private readonly repo: Repository<Point>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  // async addPoint(amount: any,payload :TokenPayload): Promise<Point> {
  //   const user = this.create({
  //     user:{
  //       id: payload.sub
  //     }
  //   })
  //   const point = await this.findOne({ where : { user : { id:user.user.userId }}})
  //   point.add(amount)
  //   return this.save(point)
  // }

  async addPoint(amount: any, payload: TokenPayload): Promise<Point> {
    const user = this.create({
      user: {
        id: payload.sub,
      },
    });

    const point = await this.findOne({ where: { user: { id: user.user.id } } });

    if (!point) {
      // 만약 point가 없다면 생성
      const newPoint = new Point();
      newPoint.user = user.user;
      newPoint.availableAmount = 0;
      await this.save(newPoint);
      return newPoint;
    }

    point.add(amount);
    return this.save(point);
  }
}
