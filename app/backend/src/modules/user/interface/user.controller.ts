import {
  Controller,
  Body,
  Get,
  Param,
  Put,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from '../app/user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
// import { Roles } from '../../../common/decorators/roles.decorator';
// import { RolesGuard } from '../../../common/guards/roles.guard';
import type { Request } from 'express';

interface JwtUser {
  id: string;
  email: string;
  role?: string;
}

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Get user by mail
  @Get('by-email/:email')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user by mail (protected)' })
  async findOne(@Param('email') email: string, @Req() req: Request) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return { message: 'User not found' };
    }

    const currentUser = req.user as JwtUser | undefined;
    if (!currentUser || currentUser.email !== user.email) {
      throw new ForbiddenException('Access denied');
    }

    return { id: user.id, email: user.email };
  }

  // Get user by ID
  @Get('by-id/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user by ID (protected)' })
  async findById(@Param('id', ParseUUIDPipe) id: string, @Req() req: Request) {
    const user = await this.userService.findById(id);
    if (!user) {
      return { message: 'User not found' };
    }

    const currentUser = req.user as JwtUser | undefined;
    if (!currentUser) {
      throw new ForbiddenException('Access denied');
    }

    if (currentUser.id !== id /* && currentUser.role !== 'admin' */) {
      throw new ForbiddenException('Access denied');
    }

    return user.toJSON();
  }

  // Get all users
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  async findAll() {
    const users = await this.userService.findAllUsers();
    return users.map((u) => u.toJSON());
  }

  // Update user
  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user (protected)' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @Req() req: Request,
  ) {
    const currentUser = req.user as JwtUser | undefined;

    if (!currentUser) {
      throw new ForbiddenException('Access denied');
    }

    if (currentUser.id !== id /* && currentUser.role !== 'admin' */) {
      throw new ForbiddenException('Access denied');
    }

    const updatedUser = await this.userService.updateUser(id, dto);
    return updatedUser.toJSON();
  }

  // Delete user
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user (temporary open for dev)' })
  // @ApiBearerAuth()
  @UseGuards(JwtAuthGuard) // , RolesGuard)
  // @Roles('admin')
  async delete(@Param('id') id: string) {
    await this.userService.deleteUser(id);
    return { message: `Utilisateur ${id} supprimé` };
  }
}
