import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../infra/auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly repo: AuthRepository) {}
}
