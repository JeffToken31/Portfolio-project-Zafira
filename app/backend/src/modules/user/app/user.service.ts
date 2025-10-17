// modules/user/app/user.service.ts
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import type { IUserRepository } from '../domain/Iuser.repository';
import { User } from '../domain/user.entity';
import * as bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository') private readonly userRepo: IUserRepository,
  ) {}

  async register(
    email: string,
    hashedPassword: string,
    firstName?: string,
    lastName?: string,
  ): Promise<User> {
    const user = new User(
      randomUUID(),
      email,
      firstName ?? null,
      lastName ?? null,
    );
    return this.userRepo.createWithPasswordCredential(user, hashedPassword);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findByEmail(email);
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepo.findById(id);
  }

  async validateUser(
    email: string,
    plainPassword: string,
  ): Promise<User | null> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) return null;
    const hash = await this.userRepo.findPasswordHashByUserId(user.id);
    if (!hash) return null;
    const ok = await bcrypt.compare(plainPassword, hash);
    return ok ? user : null;
  }

  async setEmailVerified(userId: string): Promise<User> {
    return this.userRepo.setEmailVerified(userId);
  }

  async updateUser(
    userId: string,
    fields: Partial<{
      email: string;
      firstName: string;
      lastName: string;
      password?: string;
    }>,
  ): Promise<User> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    if (fields.email) user.email = fields.email;
    if (fields.firstName || fields.lastName)
      user.updateName(fields.firstName, fields.lastName);

    if (fields.password) {
      const passwordHash = await bcrypt.hash(fields.password, 10);
      await this.userRepo.updatePassword(userId, passwordHash);
    }

    return this.userRepo.update(user);
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepo.findAll();
  }

  async deleteUser(userId: string): Promise<void> {
    await this.userRepo.delete(userId);
  }
}
