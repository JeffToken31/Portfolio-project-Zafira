// modules/user/infra/user.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { User } from '../domain/user.entity';
import { IUserRepository } from '../domain/Iuser.repository';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    const data = UserMapper.toPrismaCreate(user);
    const created = await this.prisma.user.create({ data });
    return UserMapper.toDomain(created);
  }

  async createWithPasswordCredential(
    user: User,
    passwordHash: string,
  ): Promise<User> {
    // create a user and a credential + password nested in one query
    const created = await this.prisma.user.create({
      data: {
        ...UserMapper.toPrismaCreate(user),
        credentials: {
          create: [
            {
              password: {
                create: {
                  passwordHash,
                },
              },
            },
          ],
        },
      },
      include: {
        // include minimal relations if needed
        credentials: {
          include: {
            password: true,
          },
        },
      },
    });

    return UserMapper.toDomain(created);
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map(UserMapper.toDomain);
  }

  async findById(id: string): Promise<User | null> {
    const raw = await this.prisma.user.findUnique({ where: { id } });
    return raw ? UserMapper.toDomain(raw) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const raw = await this.prisma.user.findUnique({ where: { email } });
    return raw ? UserMapper.toDomain(raw) : null;
  }

  async findPasswordHashByUserId(userId: string): Promise<string | null> {
    const pwd = await this.prisma.passwordCredential.findFirst({
      where: {
        credential: {
          userId,
        },
      },
      select: {
        passwordHash: true,
      },
    });

    return pwd ? pwd.passwordHash : null;
  }

  async update(user: User): Promise<User> {
    const updated = await this.prisma.user.update({
      where: { id: user.id },
      data: UserMapper.toPrismaUpdate(user),
    });
    return UserMapper.toDomain(updated);
  }

  async setEmailVerified(userId: string): Promise<User> {
    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: { emailVerified: true },
    });
    return UserMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    // Exécuter toutes les suppressions dans une transaction pour atomicité.
    await this.prisma.$transaction(async (prisma) => {
      await prisma.passwordCredential.deleteMany({
        where: { credential: { userId: id } },
      });

      await prisma.googleCredential.deleteMany({
        where: { credential: { userId: id } },
      });

      await prisma.credential.deleteMany({
        where: { userId: id },
      });

      await prisma.emailVerification.deleteMany({
        where: { userId: id },
      });
      await prisma.verificationToken.deleteMany({
        where: { userId: id },
      });
      await prisma.user.delete({ where: { id } });
    });
  }
}
