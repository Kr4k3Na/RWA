import { Role, AdminLevel } from '../entities/user.entity'

export class CreateUserDto {
  name: string;
  lastname: string;
  password: string;
  email: string;
  role: Role;

  // buyer specific
  deliveryAddress?: string;

  // seller specific
  payoutInfo?: string;
  storeName?: string;

  // admin specific
  level?: AdminLevel;
}