'use client';

import * as React from 'react';
import { Button } from '../uiStyled/button';
import { cn } from '@/lib/utils/cn';
import Image from 'next/image';
import GoogleLogo from '/public/google.svg';

export default function LoginForm() {
  return (
    <form className="flex flex-col gap-4">
      {/* Email */}
      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm font-medium text-text">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="votre@email.com"
          className={cn(
            'mt-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary'
          )}
        />
      </div>

      {/* Password*/}
      <div className="flex flex-col">
        <label htmlFor="password" className="text-sm font-medium text-text">
          Mot de passe
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="••••••••"
          className={cn(
            'mt-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary'
          )}
        />
      </div>

      {/* Submit button */}
      <Button type="submit" variant="default" className="w-full">
        Se connecter
      </Button>

      {/* Google connect */}
      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
      >
<Image src={GoogleLogo} alt="Google Logo" width={24} height={24} />
        Se connecter avec Google
      </Button>

      {/* Register link */}
      <p className="text-center text-sm text-text-light">
        Pas encore inscrit ?{' '}
        <a href="/register" className="text-primary hover:underline">
          Créez un compte
        </a>
      </p>
    </form>
  );
}
