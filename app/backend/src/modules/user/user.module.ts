import { Module } from '@nestjs/common';
import { UserService } from './app/user.service';
import { UserController } from './interface/user.controller';
import { UserRepository } from './infra/user.repository';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    { provide: 'IUserRepository', useClass: UserRepository },
  ],
  exports: [
    UserService,
    { provide: 'IUserRepository', useClass: UserRepository },
  ],
})
export class UserModule {}
