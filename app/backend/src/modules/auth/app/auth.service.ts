// src/modules/auth/app/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/app/user.service';
import { AuthRepository } from '../infra/auth.repository';
import { MailService } from './mail.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly authRepo: AuthRepository,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  // Suscrib and send verification email
  async register(
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
  ) {
    const existing = await this.userService.findByEmail(email);
    if (existing) throw new UnauthorizedException('Email already in use');

    const hashed = await bcrypt.hash(password, 10);

    // Use UserService to call UserRepository
    const user = await this.userService.register(
      email,
      hashed,
      firstName,
      lastName,
    );
    console.log('user creer');
    // Creat verification token
    const tokenRow = await this.authRepo.createVerificationToken(user.id);

    // Send mail
    await this.mailService.sendVerificationEmail(email, tokenRow.token);
    console.log('sendVerification called');

    return { message: 'User created. Verification email sent.' };
  }

  // mail verification
  async verifyEmail(token: string) {
    const row = await this.authRepo.findByToken(token);
    if (!row) throw new UnauthorizedException('Invalid or expired token');

    if (row.expiresAt < new Date()) {
      await this.authRepo.deleteByToken(token);
      throw new UnauthorizedException('Token expired');
    }

    // Call userservice to update emailverified
    const user = await this.userService.setEmailVerified(row.userId);

    // Delete token verification
    await this.authRepo.deleteByToken(token);

    return { message: 'Email verified', user: user.toJSON() };
  }

  // Login return access token and user
  async login(email: string, password: string) {
    const user = await this.userService.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const token = this.generateJwt(user);
    return { access_token: token, user: user.toJSON() };
  }

  async validateGoogleUser(profile: {
    googleSub: string;
    googleEmail: string;
    googleFirstName?: string;
    googleLastName?: string;
    googleAvatarUrl?: string;
  }): Promise<User> {
    const {
      googleSub,
      googleEmail,
      googleFirstName,
      googleLastName,
      googleAvatarUrl,
    } = profile;

    // Check if exist by google credencial
    let user = await this.authRepo.findUserByGoogleSub(googleSub);

    if (user) {
      return user;
    }

    // If not exist, creating User + Credential + GoogleCredential
    user = await this.authRepo.createUserWithGoogle({
      email: googleEmail,
      firstName: googleFirstName,
      lastName: googleLastName,
      googleSub,
      googleAvatarUrl,
    });

    return user;
  }

  // Generate a JWT for the front
  generateJwt(user: Pick<User, 'id' | 'email' | 'role'>): string {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
    });
  }
}
