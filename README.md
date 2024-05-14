<p align=center>

<h3> :blush:소개 </h3>
로그인 및 결제서비스<br>

주요 기능 : <br>

1. **로그인 및 회원가입**

- 회원가입 : 유저의 비밀번호는 argon2로 암호화해 회원가입합니다.
- 로그인 : 로그인 시 Access, Refresh 토큰을 발급합니다.
- RefreshToken : 로그인 시 만료되면 AccessToken을 재발급합니다.
- TokenBlackList : 만료된 토큰으로 로그인 시도를 할 경우 블랙리스트에 추가합니다.

2. **상품 주문**

- Coupon : 쿠폰, 이슈 쿠폰으로 나누어 쿠폰 발급 -> 쿠폰 등록 -> 쿠폰 사용이 가능합니다
- 포인트 충전 : 토스페이먼츠를 통해 포인트 충전이 가능합니다.
- 주문 : 로그인 후 productId, quantity를 입력하면 포인트를 조회 후 결제합니다.
- 주문 상태 : 유저는 주문 상태와 배송업체, 송장 번호를 확인 할 수 있습니다.

<h3>사용한 기술 스택<h3>
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img alt="NestJS" src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white">
<img alt="TypeORM" src="https://img.shields.io/badge/TypeORM-376E9B?style=for-the-badge&logo=typeorm&logoColor=white">
<img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white">
</p>

<img alt="erd" src="./erd.png"></p>

<h3>Api 명세<h3>
<img alt="Api" src="./api.png"></p>
