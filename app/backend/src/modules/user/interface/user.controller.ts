// modules/user/interface/user.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from '../app/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un utilisateur' })
  async create(@Body() dto: CreateUserDto) {
    const user = await this.userService.register(dto.email, dto.password);
    return { id: user.id, email: user.email };
  }

  @Get(':email')
  async findOne(@Param('email') email: string) {
    const user = await this.userService.findByEmail(email);
    return user ? { id: user.id, email: user.email } : null;
  }
}
