'use client';

import * as React from 'react';
import {Button} from '../uiStyled/button';
import {cn} from '@/lib/utils/cn';
import { useAuth } from '@/lib/hooks/useAuth';
import {useRouter} from 'next/navigation';

export default function RegisterForm() {
  const {register, login} = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    // Check password lenght and email is valide
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError('Adresse e-mail invalide');
      return;
    }

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    } else {
      setError(null);
    }
    
    setLoading(true);

    interface ErrorResponse {
      message: string;
    }

    try {
      await register({ email, password, firstname, lastname });
      await login({email, password});
      router.push('/');
    } catch (err: unknown) {
      const e = err as ErrorResponse;
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {/* Firstname */}
      <div className="flex flex-col">
        <label htmlFor="firstname" className="text-sm font-medium text-text">
          Prénom
        </label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          placeholder="Votre prénom"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className={cn(
            'mt-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary'
          )}
          required
        />
      </div>

      {/* Lastname */}
      <div className="flex flex-col">
        <label htmlFor="lastname" className="text-sm font-medium text-text">
          Nom
        </label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          placeholder="Votre nom"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className={cn(
            'mt-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary'
          )}
          required
        />
      </div>

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
        {loading ? 'Inscription...' : 'Créer un compte'}
      </Button>

      {/* Login link */}
      <p className="text-center text-sm">
        Déjà inscrit ?{' '}
        <a href="/login" className="text-primary hover:underline">
          Connectez-vous
        </a>
      </p>
    </form>
  );
}
