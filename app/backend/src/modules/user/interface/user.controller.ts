// modules/user/interface/user.controller.ts
import {
  Controller,
  Body,
  Get,
  Param,
  Put,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from '../app/user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /*
  @Post()
  @ApiOperation({ summary: 'Créer un utilisateur' })
  async create(@Body() dto: RegisterUserDto) {
    const user = await this.userService.register(dto.email, dto.password);
    return { id: user.id, email: user.email };
  }*/

  // Get user by mail
  @Get('by-email/:email')
  @ApiOperation({ summary: 'Get user by mail' })
  async findOne(@Param('email') email: string) {
    const user = await this.userService.findByEmail(email);
    return user ? { id: user.id, email: user.email } : null;
  }

  // Get user by ID
  @Get('by-id/:id')
  @ApiOperation({ summary: 'Get user by ID' })
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.findById(id);
    return user ? user.toJSON() : { message: 'User not found' };
  }

  // Get all users
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async findAll() {
    const users = await this.userService.findAllUsers();
    return users.map((u) => ({ id: u.id, email: u.email }));
  }

  // 🟢 Update user
  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const updatedUser = await this.userService.updateUser(id, dto);
    return updatedUser.toJSON();
  }

  // 🟢 Delete user
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  async delete(@Param('id') id: string) {
    await this.userService.deleteUser(id);
    return { message: `Utilisateur ${id} supprimé` };
  }
}
