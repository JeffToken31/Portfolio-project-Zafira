// src/common/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy as JwtStrategyBase,
  ExtractJwt,
  StrategyOptions,
} from 'passport-jwt';
import { AuthUser } from '../../interface/auth-user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(JwtStrategyBase) {
  constructor() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET not defined in environment');
    }
    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    };
    super(options);
  }

  validate(payload: {
    sub: string;
    email: string;
    role: string;
  }): Promise<AuthUser> {
    return Promise.resolve({
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    });
  }
}
