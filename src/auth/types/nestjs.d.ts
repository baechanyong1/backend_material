// src/types/express.d.ts 또는 src/types/nestjs.d.ts

import { User } from '../auth/entities'; // User의 실제 경로에 따라 수정

declare module 'express' {
  interface Request {
    user?: User;
  }
}
