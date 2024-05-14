import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AccessTokenRepository, UserRepository } from '../repositories';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userRepo: UserRepository, // 사용자 리포지토리 주입
    private readonly accessTokenRepo: AccessTokenRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const email = request.body.email; // 또는 요청에서 사용자 이메일을 어떻게든 가져옵니다.
    console.log('11', request.body);
    try {
      // 이메일을 사용하여 사용자를 비동기적으로 찾습니다.
      const user = await this.userRepo.findOneByEmail(email);
      if (user) {
        // 사용자를 찾았으면 요청 객체에 사용자를 할당합니다.
        request.user = user;
        return true; // 인증 성공
      }

      // 사용자를 찾지 못한 경우 인증 실패
      return false;
    } catch (error) {
      console.error('Error while finding user:', error);
      return false; // 검색 중에 오류가 발생한 경우 인증 실패
    }
  }
}
