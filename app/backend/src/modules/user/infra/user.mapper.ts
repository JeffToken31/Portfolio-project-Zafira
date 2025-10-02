// modules/user/infra/user.mapper.ts
import { User } from '../domain/user.entity';
import { Prisma } from '@prisma/client';

export class UserMapper {
  // 🔄 Prisma → Domain
  static toDomain(prismaUser: Prisma.UserGetPayload<any>): User {
    return new User(
      prismaUser.id,
      prismaUser.email,
      prismaUser.password,
      prismaUser.createdAt,
      prismaUser.updatedAt,
    );
  }

  // 🔄 Domain → Prisma
  static toPrisma(user: User): Prisma.UserCreateInput | Prisma.UserUpdateInput {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
