// app/backend/src/modules/user/interface/dto/user-response.dto.ts
import { User } from '../../domain/user.entity';

export class UserResponseDto {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName ?? null;
    this.lastName = user.lastName ?? null;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
