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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Register
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(
      dto.email,
      dto.password,
      dto.firstName,
      dto.lastName,
    );
  }

  // Vérification mail
  @Post('verify-email')
  verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  // Login
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }

  // Redirect to google auth
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  // Callback after google verification
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(
    @Req() req: Request & { user?: User },
    @Res() res: Response,
  ) {
    const prismaUser = req.user;
    if (!prismaUser) {
      return res.status(401).json({ message: 'No user found' });
    }

    const jwtUser: Pick<User, 'id' | 'email' | 'role'> = {
      id: prismaUser.id,
      email: prismaUser.email,
      role: prismaUser.role,
    };

    const token = this.authService.generateJwt(jwtUser);

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.redirect('http://localhost:3000/');
  }
}
