import { Controller, Body, Post } from '@nestjs/common';
import { AuthService, UserService } from '../services';
import {
  CreateUserDto,
  LoginReqDto,
  LoginResDto,
  RefreshReqDto,
  SignupResDto,
} from '../dto';
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
}
