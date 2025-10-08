import {
  Body,
  Controller,
  Post,
  Query,
  Get,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../app/auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import type { Response, Request } from 'express';
import { User } from '@prisma/client';

// Étendre Request pour inclure `user` injecté par Passport
interface GoogleRequest extends Request {
  user?: User;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 🔹 Inscription classique
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(
      dto.email,
      dto.password,
      dto.firstName,
      dto.lastName,
    );
  }

  // 🔹 Vérification email
  @Post('verify-email')
  verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  // 🔹 Login classique
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }

  // 🔹 Route pour initier le login Google
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: GoogleRequest) {
    // Passport gère la redirection automatiquement
  }

  // 🔹 Callback après authentification Google
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const prismaUser = req.user as User | undefined;
    if (!prismaUser) {
      return res.status(401).json({ message: 'No user found' });
    }

    // On ne garde que les champs nécessaires pour JWT
    const jwtUser: Pick<User, 'id' | 'email' | 'role'> = {
      id: prismaUser.id,
      email: prismaUser.email,
      role: prismaUser.role,
    };

    const token = await this.authService.generateJwt(jwtUser);
    return res.redirect(`http://localhost:3000/login/success?token=${token}`);
  }
}
