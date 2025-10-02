import { Controller, Get } from '@nestjs/common';
import { AuthService } from '../app/auth.service';

@Controller('auths')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Get()
  async getAll() {
    return [];
  }
}
