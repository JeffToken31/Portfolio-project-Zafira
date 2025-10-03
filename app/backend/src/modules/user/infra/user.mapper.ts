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

  // 🔄 Domain → Prisma (Create)
  static toPrismaCreate(user: User): Prisma.UserCreateInput {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  // 🔄 Domain → Prisma (Update)
  static toPrismaUpdate(user: User): Prisma.UserUpdateInput {
    return {
      email: user.email,
      password: user.password,
      updatedAt: user.updatedAt,
    };
  }
}
