<p align=center>
<h3> :blush:소개 </h3>
로그인 서비스

<h3>사용한 기술 스택<h3>
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img alt="NestJS" src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white">
<img alt="TypeORM" src="https://img.shields.io/badge/TypeORM-376E9B?style=for-the-badge&logo=typeorm&logoColor=white">
<img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white">
</p>


```
backend_material
├─ .eslintrc.js
├─ .prettierrc
├─ Dockerfile
├─ nest-cli.json
├─ package.json
├─ README.md
├─ src
│  ├─ app.controller.spec.ts
│  ├─ app.controller.ts
│  ├─ app.module.ts
│  ├─ app.service.ts
│  ├─ auth
│  │  ├─ auth.module.ts
│  │  ├─ controllers
│  │  │  ├─ auth.controller.ts
│  │  │  └─ index.ts
│  │  ├─ dto
│  │  │  ├─ create-user.dto.ts
│  │  │  ├─ index.ts
│  │  │  ├─ login-req.dto.ts
│  │  │  ├─ login-res.dto.ts
│  │  │  ├─ refresh-req.dto.ts
│  │  │  └─ signup-res.dto.ts
│  │  ├─ entities
│  │  │  ├─ access-log.entity.ts
│  │  │  ├─ access-token.entity.ts
│  │  │  ├─ index.ts
│  │  │  ├─ refresh-token.entity.ts
│  │  │  ├─ token-blacklist.entity.ts
│  │  │  └─ user.entity.ts
│  │  ├─ repositories
│  │  │  ├─ access-log.repository.ts
│  │  │  ├─ access-token.repository.ts
│  │  │  ├─ index.ts
│  │  │  ├─ refresh-token.repository.ts
│  │  │  ├─ token-blacklist.repository.ts
│  │  │  └─ user.repository.ts
│  │  ├─ services
│  │  │  ├─ auth.service.ts
│  │  │  ├─ index.ts
│  │  │  ├─ token-blacklist.ts
│  │  │  └─ user.service.ts
│  │  ├─ strategies
│  │  │  ├─ index.ts
│  │  │  └─ jwt.strategy.ts
│  │  └─ types
│  │     └─ index.ts
│  ├─ common
│  │  ├─ entity
│  │  │  ├─ base-entity.ts
│  │  │  └─ index.ts
│  │  └─ util
│  │     ├─ date-utils.ts
│  │     └─ index.ts
│  ├─ config
│  │  ├─ ormconfig.ts
│  │  └─ validation.schema.ts
│  ├─ exception
│  │  ├─ business.exception.filter.ts
│  │  ├─ business.exception.ts
│  │  └─ index.ts
│  ├─ interceptors
│  │  ├─ index.ts
│  │  └─ logging.interceptor.ts
│  ├─ main.ts
│  └─ payment
├─ test
│  ├─ app.e2e-spec.ts
│  └─ jest-e2e.json
├─ tsconfig.build.json
├─ tsconfig.json
└─ yarn.lock

```

<h4>결제 기능 구현하기<h4/>
-Point, Product, Coupon, Shipping, Order Entity 만들 예정<br>
-쿠폰, 상품을 선택 후 주문<br>
-주문 상태에서 결제 ( 결제 시 포인트 차감 / 트랜잭션 ) <br>
-결제 완료 시 주문 확인 <br>
-결제가 완료된 건의 상태 ( 발송, 배송완료 등 )를 판매자가 설정 가능하게 만들기<br>
<br>
쿠폰은 정액제( 5천원 등 금액 ), 정률제( 30% 등 )이 있을 예정 <br>
PG사 결제( 토스 )<br>
결제는 카테고리, 상품ID 등을 넣어 상품마다 할인이 가능하게 구현 예정
