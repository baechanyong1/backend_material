import { AccessTokenRepository, UserRepository } from '../repositories';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as argon2 from 'argon2';
import { User } from '../entities';
import { CreateUserDto } from '../dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly userRepo: UserRepository,
    private readonly accessTokenRepo: AccessTokenRepository,
  ) {}

  async signup(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepo.findOneByEmail(dto.email);
    if (user) {
      throw new HttpException(
        '이미 사용중인 이메일 입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (dto.password !== dto.confirm) {
      throw new HttpException(
        '비밀번호가 일치하지 않습니다',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await argon2.hash(dto.password);
    return this.userRepo.createUser(dto, hashedPassword);
  }

  async validateUser(id: string, jti: string): Promise<User> {
    const [user, token] = await Promise.all([
      this.userRepo.findOneBy({ id }),
      this.accessTokenRepo.findOneByJti(jti),
    ]);
    if (!user) {
      this.logger.error(`user ${id} not found`);
      throw new HttpException(`user not found`, HttpStatus.BAD_REQUEST);
    }
    if (!token) {
      this.logger.error(`jti ${jti} token is revoked`);
      throw new HttpException(`revoked token`, HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}
