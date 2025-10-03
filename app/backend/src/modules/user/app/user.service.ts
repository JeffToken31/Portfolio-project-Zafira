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

  // 🔑 Inscription d'un nouvel utilisateur
  async register(email: string, plainPassword: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    const user = new User(
      randomUUID(),
      email,
      hashedPassword,
      new Date(),
      new Date(),
    );
    return this.userRepo.create(user);
  }

  // 🔍 Recherche par email
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findByEmail(email);
  }

  // ✅ Vérifie le mot de passe pour authentification
  async validateUser(
    email: string,
    plainPassword: string,
  ): Promise<User | null> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) return null;

    const isValid = await bcrypt.compare(plainPassword, user.password);
    return isValid ? user : null;
  }

  // ✏️ Mise à jour des informations d'un utilisateur
  async updateUser(
    userId: string,
    fields: Partial<{ email: string; password: string }>,
  ): Promise<User> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    if (fields.email) user.email = fields.email;
    if (fields.password)
      user.updatePassword(await bcrypt.hash(fields.password, 10));

    return this.userRepo.update(user);
  }

  // 🗑️ Supprimer un utilisateur
  async deleteUser(userId: string): Promise<void> {
    await this.userRepo.delete(userId);
  }

  // 📋 Récupérer tous les utilisateurs (utile pour l'admin)
  async findAllUsers(): Promise<User[]> {
    return this.userRepo.findAll();
  }
}
