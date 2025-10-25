import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { BlogModule } from './modules/blog/blog.module';
import { ActionModule } from './modules/action/action.module';
import { PartnerModule } from './modules/partner/partner.module';
import { TestimonialModule } from './modules/testimonial/testimonial.module';
import { UploadModule } from './modules/upload/upload.module';
import { ManualStatsModule } from './modules/manualStats/manualStats.module';
import { StatsModule } from './modules/stats/stats.module';
@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    BlogModule,
    ActionModule,
    PartnerModule,
    TestimonialModule,
    UploadModule,
    ManualStatsModule,
    StatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
