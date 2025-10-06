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
  async googleAuthRedirect(@Req() req: GoogleRequest, @Res() res: Response) {
    if (!req.user) {
      return res.status(401).json({ message: 'No user found' });
    }

    // Génération du JWT
    const token = await this.authService.generateJwt(req.user);

    // Redirection vers le front avec le token
    return res.redirect(`http://localhost:3000/login/success?token=${token}`);
  }
}
