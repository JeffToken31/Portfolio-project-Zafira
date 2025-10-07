import { User } from '../domain/user.entity';
import { Prisma } from '@prisma/client';

export class UserMapper {
  static toDomain(
    raw: Prisma.UserGetPayload<{
      select: {
        id: true;
        email: true;
        firstName: true;
        lastName: true;
        role: true;
        emailVerified: true;
        createdAt: true;
        updatedAt: true;
      };
    }>,
  ): User {
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

  static toPrismaCreate(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName ?? undefined,
      lastName: user.lastName ?? undefined,
      role: user.role,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static toPrismaUpdate(user: User): Prisma.UserUncheckedUpdateInput {
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
