import { User } from '../domain/user.entity';
import { Prisma } from '@prisma/client';

export class UserMapper {
  static toDomain(raw: Prisma.UserGetPayload<any> | any): User {
    return new User(
      raw.id,
      raw.email,
      raw.firstName ?? null,
      raw.lastName ?? null,
      raw.role ?? 'BENEFICIARY',
      raw.emailVerified ?? false,
      raw.createdAt,
      raw.updatedAt,
    );
  }

  static toPrismaCreate(user: User): Prisma.UserCreateInput {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName ?? undefined,
      lastName: user.lastName ?? undefined,
      role: user.role,
      emailVerified: user.emailVerified,
      // credentials handled separately in createWithPasswordCredential
    };
  }

  static toPrismaUpdate(user: User): Prisma.UserUpdateInput {
    return {
      email: user.email,
      firstName: user.firstName ?? undefined,
      lastName: user.lastName ?? undefined,
      role: user.role,
      emailVerified: user.emailVerified,
      updatedAt: new Date(),
    };
  }
}
