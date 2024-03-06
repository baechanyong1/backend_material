import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { AccessLog, AccessToken, RefreshToken, User } from 'src/auth/entities';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234aaaa',
      database: 'postgres',
      entities: [User, AccessToken, RefreshToken, AccessLog],
      //[__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    };
  }
}
