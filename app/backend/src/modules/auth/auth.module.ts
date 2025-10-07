import { Module } from '@nestjs/common';
import { AuthService } from './app/auth.service';
import { AuthController } from './interface/auth.controller';
import { AuthRepository } from './infra/auth.repository';
import { MailService } from './app/mail.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { PrismaService } from '../../prisma/prisma.service';
import { GoogleStrategy } from './infra/strategy/google.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN ?? '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    MailService,
    PrismaService,
    GoogleStrategy,
  ],
})
export class AuthModule {}
