export type TokenPayload = {
  sub: string; // subject 토콘의 주제 (ID)
  iat: number; // issued At 토큰이 발급된 시간
  jti: string; // jwt ID jwt의 고유 식별자
};

export type OauthProvider = 'kakao' | 'naver';

export type RequestInfo = {
  ip: string;
  ua: string;
  endpoint: string;
};

export type OauthUserInfo = {
  name: string;
  email: string;
  phone: string;
  provider: OauthProvider;
  providerId: string;
};

export type CreateTokenPayloadInput = {
  sub: string;
  iat: number;
  jti: string;
};

export type CreateUserInput = {
  name: string;
  email: string;
};

export type KakaoRequestInput = {
  code: string;
};
export type NaverRequestInput = {
  code: string;
  state: string;
};
