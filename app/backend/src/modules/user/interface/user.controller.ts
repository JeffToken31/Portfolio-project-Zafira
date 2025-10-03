// modules/user/interface/user.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from '../app/user.service';
import { CreateUserDto } from './dto/create-user.dto'; // Assure-toi que ces DTO existent
import { UpdateUserDto } from './dto/update-user.dto'; // Assure-toi que ces DTO existent
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 🟢 Créer un utilisateur
  @Post()
  @ApiOperation({ summary: 'Créer un utilisateur' })
  async create(@Body() dto: CreateUserDto) {
    const user = await this.userService.register(dto.email, dto.password);
    return { id: user.id, email: user.email };
  }

  // 🟢 Récupérer un utilisateur par email
  @Get(':email')
  @ApiOperation({ summary: 'Récupérer un utilisateur par email' })
  async findOne(@Param('email') email: string) {
    const user = await this.userService.findByEmail(email);
    return user ? { id: user.id, email: user.email } : null;
  }

  // 🟢 Récupérer tous les utilisateurs
  @Get()
  @ApiOperation({ summary: 'Récupérer tous les utilisateurs' })
  async findAll() {
    const users = await this.userService.findAllUsers();
    return users.map((u) => ({ id: u.id, email: u.email }));
  }

  // 🟢 Mettre à jour un utilisateur
  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un utilisateur' })
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const updatedUser = await this.userService.updateUser(id, dto);
    return { id: updatedUser.id, email: updatedUser.email };
  }

  // 🟢 Supprimer un utilisateur
  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un utilisateur' })
  async delete(@Param('id') id: string) {
    await this.userService.deleteUser(id);
    return { message: `Utilisateur ${id} supprimé` };
  }
}
