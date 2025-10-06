import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { randomUUID } from 'crypto';

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
}
