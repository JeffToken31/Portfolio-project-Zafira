// src/common/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as JwtStrategyBase } from 'passport-jwt';
import { AuthUser } from '../../interface/auth-user.interface';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(JwtStrategyBase) {
  constructor() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET not defined in environment');
    }
    super({
      // keep JWT from cookie
      jwtFromRequest: (req: Request): string | null => {
        const token = (req.cookies as { [key: string]: string })?.[
          'auth_token'
        ];
        if (typeof token === 'string') return token;
        return null;
      },
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  validate(payload: unknown): Promise<AuthUser> {
    if (
      typeof payload === 'object' &&
      payload !== null &&
      'sub' in payload &&
      'email' in payload &&
      'role' in payload
    ) {
      const p = payload as {
        sub: string;
        email: string;
        role: string;
        firstName?: string;
      };
      return Promise.resolve({
        id: p.sub,
        email: p.email,
        role: p.role,
        firstName: p.firstName ?? '', // fallback
      });
    }
    throw new Error('Invalid JWT payload');
  }
}
