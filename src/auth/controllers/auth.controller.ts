import { Controller, Body, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService, UserService } from '../services';
import {
  CreateUserDto,
  LoginReqDto,
  LoginResDto,
  RefreshReqDto,
  SignupResDto,
} from '../dto';
import * as cookieParser from 'cookie-parser';
import cookie from 'cookie-parser';
import { AuthGuard } from '../middleware/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<SignupResDto> {
    const user = await this.userService.signup(createUserDto);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
  }

  //login시 res.locals.user 반환하기
  @UseGuards(AuthGuard)
  @Post('login')
  async login(
    @Req() req,
    @Body() loginReqDto: LoginReqDto,
  ): Promise<LoginResDto> {
    const { ip, method, originalUrl } = req;
    const reqInfo = {
      ip,
      endpoint: `${method} ${originalUrl}`,
      ua: req.headers['user-agent'] || '',
    };
    return this.authService.login(
      loginReqDto.email,
      loginReqDto.password,
      reqInfo,
    );
  }
}
