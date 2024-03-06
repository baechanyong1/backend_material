import { UserRole } from '../entities';

export type CreateUserDto = {
  name: string;
  email: string;
  password: string;
  confirm: string;
  phone: string;
  role: UserRole;
};
