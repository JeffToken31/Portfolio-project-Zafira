import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    let requiredRoles = this.reflector.getAllAndOverride<string[] | string>(
      ROLES_KEY,
      [ctx.getHandler(), ctx.getClass()],
    );

    if (!requiredRoles) return true;

    if (typeof requiredRoles === 'string') {
      requiredRoles = [requiredRoles];
    }

    const req = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = req.user;
    if (!user) return false;

    if (
      !requiredRoles
        .map((r) => r.toLowerCase())
        .includes(user.role.toLowerCase())
    ) {
      throw new ForbiddenException('Forbidden operation.');
    }

    return true;
  }
}
