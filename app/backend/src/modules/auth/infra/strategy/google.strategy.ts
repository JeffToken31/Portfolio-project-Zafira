import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../../app/auth.service';

interface GoogleProfile {
  id: string;
  emails?: { value: string }[];
  name?: { givenName?: string; familyName?: string };
  photos?: { value?: string }[];
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: GoogleProfile,
    done: VerifyCallback,
  ): Promise<void> {
    try {
      // On force TypeScript à savoir que profile est bien notre GoogleProfile
      const user = await this.authService.validateGoogleUser({
        googleSub: profile.id,
        googleEmail: profile.emails?.[0]?.value ?? '',
        googleFirstName: profile.name?.givenName,
        googleLastName: profile.name?.familyName,
        googleAvatarUrl: profile.photos?.[0]?.value,
      });

      done(null, user);
    } catch (err) {
      done(err as Error, false);
    }
  }
}
