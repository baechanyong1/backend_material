import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    //HttpModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('ACCESS_TOKEN_EXPIRY'),
        },
      }),
    }),
    // PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([
      //   User,
      //   AccessToken,
      //   RefreshToken,
      //   AccessLog,
      //   TokenBlacklist,
    ]),
  ],
  //   controllers: [AuthController],
  providers: [
    // UserService,
    // AuthService,
    // TokenBlacklistService,
    // UserRepository,
    // AccessTokenRepository,
    // RefreshTokenRepository,
    // AccessLogRepository,
    // TokenBlacklistRepository,
    // JwtStrategy,
  ],
  exports: [
    // UserService,
    // AuthService,
    // TokenBlacklistService,
    // UserRepository,
    // AccessTokenRepository,
    // RefreshTokenRepository,
    // AccessLogRepository,
    // TokenBlacklistRepository,
    // JwtStrategy,
  ],
})
export class AuthModule {}
