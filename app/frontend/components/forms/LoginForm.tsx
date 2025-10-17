'use client';

import * as React from 'react';
import {Button} from '../uiStyled/button';
import {cn} from '@/lib/utils/cn';
import Image from 'next/image';
import GoogleLogo from '/public/google.svg';
import {useAuth} from '@/lib/hooks/useAuth';
import {useRouter} from 'next/navigation';

interface ErrorResponse {
  message: string;
}

interface LoginFormProps {
  closeModal?: () => void;
}

export default function LoginForm({closeModal}: LoginFormProps) {
  const {login, loginWithGoogle, user} = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (user) {
      if (closeModal) {
        closeModal();
      } else {
        router.push('/'); // router.refresh()
      }
    }
  }, [user, closeModal, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login({email, password});
    } catch (err: unknown) {
      const e = err as ErrorResponse;
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      // redirect is done by backend
    } catch (err: unknown) {
      const e = err as ErrorResponse;
      setError(e.message);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={cn(
            'mt-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary'
          )}
          required
        />
      </div>

      {/* Password */}
      <div className="flex flex-col">
        <label htmlFor="password" className="text-sm font-medium text-text">
          Mot de passe
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={cn(
            'mt-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary'
          )}
          required
        />
      </div>

      {/* Error message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Submit button */}
      <Button
        type="submit"
        variant="default"
        className="w-full"
        disabled={loading}
      >
        {loading ? 'Connexion...' : 'Se connecter'}
      </Button>

      {/* Google connect */}
      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
        onClick={handleGoogleLogin}
      >
        <Image src={GoogleLogo} alt="Google Logo" width={24} height={24} />
        Se connecter avec Google
      </Button>

      {/* Register link */}
      <p className="text-center text-sm">
        Pas encore inscrit ?{' '}
        <a href="/register" className="text-primary hover:underline">
          Créez un compte
        </a>
      </p>
    </form>
  );
}
