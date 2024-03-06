import { Injectable } from '@nestjs/common';
import {
  UserRepository,
  AccessTokenRepository,
  RefreshTokenRepository,
  AccessLogRepository,
  TokenBlacklistRepository,
} from '../repositories';
import { JwtStrategy } from '../strategies';
import { CreateUserDto } from '../dto';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    //private readonly tokenBlacklistService: TokenBlacklistService,
    private readonly userRepository: UserRepository,
    private readonly accessTokenRepository: AccessTokenRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly accessLogRepository: AccessLogRepository,
    private readonly tokenBlacklistRepository: TokenBlacklistRepository,
    private readonly jwtStrategy: JwtStrategy,
  ) {}
}
