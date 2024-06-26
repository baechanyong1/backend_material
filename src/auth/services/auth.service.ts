import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  UserRepository,
  AccessTokenRepository,
  RefreshTokenRepository,
  AccessLogRepository,
  TokenBlacklistRepository,
} from '../repositories';
import { JwtStrategy } from '../strategies';
import { CreateUserDto, LoginResDto } from '../dto';
import { UserService } from './user.service';
import { RequestInfo, TokenPayload } from '../types';
import { User } from '../entities';
import * as argon2 from 'argon2';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { TokenBlacklistService } from './token-blacklist';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly accessTokenRepository: AccessTokenRepository,
    private readonly accessLogRepository: AccessLogRepository,
    private readonly tokenBlacklistService: TokenBlacklistService,
    private readonly userService: JwtStrategy,
  ) {}

  async login(
    email: string,
    password: string,
    req: RequestInfo,
  ): Promise<LoginResDto> {
    const user = await this.validateUser(email, password);
    const payload: TokenPayload = this.createTokenPayload(user.id);
    const [accessToken, refreshToken] = await Promise.all([
      this.createAccessToken(user, payload),
      this.createRefreshToken(user, payload),
    ]);
    const { ip, endpoint, ua } = req;
    await this.accessLogRepository.createAccessLog(user, ua, endpoint, ip);
    const user2 = await this.userService.validate(payload);
    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.phone,
        phone: user.phone,
      },
    };
  }

  async logout(accessToken: string, refreshToken: string): Promise<void> {
    const [jtiAccess, jtiRefresh] = await Promise.all([
      this.jwtService.verifyAsync(accessToken, {
        secret: this.configService.get<string>('JWT_SECRET'),
      }),
      this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('JWT_SECRET'),
      }),
    ]);
    await Promise.all([
      this.addToBlacklist(
        accessToken,
        jtiAccess,
        'access',
        'ACCESS_TOKEN_EXPIRY',
      ),
      this.addToBlacklist(
        refreshToken,
        jtiRefresh,
        'refresh',
        'REFRESH_TOKEN_EXPIRY',
      ),
    ]);
  }

  private async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOneByEmail(email);
    if (user && (await argon2.verify(user.password, password))) {
      return user;
    }
    throw new HttpException('유저 검증 실패', HttpStatus.BAD_REQUEST);
  }

  async createAccessToken(user: User, payload: TokenPayload): Promise<string> {
    const expiresIn = this.configService.get<string>('ACCESS_TOKEN_EXPIRY');
    const token = this.jwtService.sign(payload, { expiresIn });
    const expiresAt = this.calculateExpiry(expiresIn);

    await this.accessTokenRepository.saveAccessToken(
      payload.jti,
      user,
      token,
      expiresAt,
    );

    return token;
  }

  async createRefreshToken(user: User, payload: TokenPayload): Promise<string> {
    const expiresIn = this.configService.get<string>('REFRESH_TOKEN_EXPIRY');
    const token = this.jwtService.sign(payload, { expiresIn });
    const expiresAt = this.calculateExpiry(expiresIn);

    await this.refreshTokenRepository.saveRefreshToken(
      payload.jti,
      user,
      token,
      expiresAt,
    );

    return token;
  }

  createTokenPayload(userId: string): TokenPayload {
    return {
      sub: userId,
      iat: Math.floor(Date.now() / 1000),
      jti: uuidv4(),
    };
  }

  private async addToBlacklist(
    token: string,
    jti: string,
    type: 'access' | 'refresh',
    expiryConfigKey: string,
  ): Promise<void> {
    const expiryTime = this.calculateExpiry(
      this.configService.get<string>(expiryConfigKey),
    );
    await this.tokenBlacklistService.addToBlacklist(
      token,
      jti,
      type,
      expiryTime,
    );
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    try {
      const { exp, ...payload } = await this.jwtService.verifyAsync(
        refreshToken,
        {
          secret: this.configService.get<string>('JWT_SECRET'),
        },
      );

      const user = await this.userRepository.findOneBy({ id: payload.sub });
      if (!user) {
        throw new HttpException('auth', HttpStatus.UNAUTHORIZED);
      }

      return this.createAccessToken(user, payload as TokenPayload);
    } catch (error) {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }
  }

  async verifyToken(token: string): Promise<User | undefined> {
    try {
      const payload: TokenPayload = this.jwtService.verify(token);
      const userId = payload.sub; // 예상대로 페이로드에서 사용자 ID를 추출
      const user = await this.userRepository.findById(userId); // 사용자 ID로 사용자 정보를 가져옴
      return user; // 가져온 사용자 정보를 반환
    } catch (error) {
      // 토큰이 유효하지 않은 경우
      return undefined;
    }
  }

  // 시간 만료 함수
  private calculateExpiry(expiry: string): Date {
    let expiresInMilliseconds = 0;
    if (expiry.endsWith('d')) {
      const days = parseInt(expiry.slice(0, -1), 10);
      expiresInMilliseconds = days * 24 * 60 * 60 * 1000;
    } else if (expiry.endsWith('h')) {
      const hours = parseInt(expiry.slice(0, -1), 10);
      expiresInMilliseconds = hours * 60 * 60 * 1000;
    } else if (expiry.endsWith('m')) {
      const minutes = parseInt(expiry.slice(0, -1), 10);
      expiresInMilliseconds = minutes * 60 * 1000;
    } else if (expiry.endsWith('s')) {
      const seconds = parseInt(expiry.slice(0, -1), 10);
      expiresInMilliseconds = seconds * 1000;
    } else {
      throw new HttpException('Invalid expiry time', HttpStatus.BAD_REQUEST);
    }

    return new Date(Date.now() + expiresInMilliseconds);
  }
}
