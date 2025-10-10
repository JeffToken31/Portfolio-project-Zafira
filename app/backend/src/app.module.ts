import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { BlogModule } from './modules/blog/blog.module';
import { ActionModule } from './modules/action/action.module';
import { PartnerModule } from './modules/partner/partner.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, BlogModule, ActionModule, PartnerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
