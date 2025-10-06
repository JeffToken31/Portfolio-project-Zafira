// src/modules/auth/app/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/app/user.service';
import { AuthRepository } from '../infra/auth.repository';
import { MailService } from './mail.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly authRepo: AuthRepository,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  // 🟢 Inscription + envoi du mail de vérification
  async register(
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
  ) {
    const existing = await this.userService.findByEmail(email);
    if (existing) throw new UnauthorizedException('Email already in use');

    const hashed = await bcrypt.hash(password, 10);

    // ✅ Utilisation de ton UserService qui appelle le UserRepository
    const user = await this.userService.register(
      email,
      hashed,
      firstName,
      lastName,
    );
    console.log('user creer');
    // ✅ Création d’un token via le repository Auth
    const tokenRow = await this.authRepo.createVerificationToken(user.id);
    console.log('creat verification token passed');

    // ✅ Envoi du mail
    await this.mailService.sendVerificationEmail(email, tokenRow.token);
    console.log('sendVerification called');

    return { message: 'User created. Verification email sent.' };
  }

  // 🟢 Vérification email
  async verifyEmail(token: string) {
    const row = await this.authRepo.findByToken(token);
    if (!row) throw new UnauthorizedException('Invalid or expired token');

    if (row.expiresAt < new Date()) {
      await this.authRepo.deleteByToken(token);
      throw new UnauthorizedException('Token expired');
    }

    // ✅ Appel du UserService pour mettre à jour l’emailVerified
    const user = await this.userService.setEmailVerified(row.userId);

    // ✅ Suppression du token
    await this.authRepo.deleteByToken(token);

    return { message: 'Email verified', user: user.toJSON() };
  }

  // 🟢 Login
  async login(email: string, password: string) {
    const user = await this.userService.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email };
    const access_token = await this.jwtService.signAsync(payload);

    return { access_token, user: user.toJSON() };
  }
}
