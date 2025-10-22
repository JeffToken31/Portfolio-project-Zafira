import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { randomUUID } from 'crypto';
import { User } from '../../user/domain/user.entity';
import { UserMapper } from '../../user/infra/user.mapper';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createVerificationToken(
    userId: string,
  ): Promise<{ token: string; expiresAt: Date; id: string }> {
    const token = randomUUID();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h
    const created = await this.prisma.verificationToken.create({
      data: { userId, token, expiresAt },
    });
    return {
      token: created.token,
      expiresAt: created.expiresAt,
      id: created.id,
    };
  }

  async findByToken(token: string) {
    return this.prisma.verificationToken.findUnique({ where: { token } });
  }

  async deleteByToken(token: string) {
    await this.prisma.verificationToken.delete({ where: { token } });
  }

  async findUserByGoogleSub(googleSub: string): Promise<User | null> {
    const cred = await this.prisma.credential.findFirst({
      where: { google: { googleSub } },
      include: { user: true },
    });
    return cred?.user ? UserMapper.toDomain(cred.user) : null;
  }

  async createUserWithGoogle(data: {
    email: string;
    firstName?: string;
    lastName?: string;
    googleSub: string;
    googleAvatarUrl?: string;
  }): Promise<User> {
    const created = await this.prisma.user.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: 'BENEFICIARY',
        emailVerified: true,
        credentials: {
          create: {
            google: {
              create: {
                googleSub: data.googleSub,
                googleEmail: data.email,
                googleFirstName: data.firstName,
                googleLastName: data.lastName,
                googleAvatarUrl: data.googleAvatarUrl,
              },
            },
          },
        },
      },
      include: { credentials: { include: { google: true } } },
    });

    return UserMapper.toDomain(created);
  }
}
