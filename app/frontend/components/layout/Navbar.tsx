'use client';

import {HeartHandshake} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {useAuth} from '@/lib/hooks/useAuth';
import {Button} from '../uiStyled/button';
import MobileMenu from './MobileMenu';
import LoginDialog from '../uiStyled/LoginDialog';

export default function Navbar() {
  const router = useRouter();
  const {user, logout} = useAuth();

  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between bg-bg shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <HeartHandshake className="w-4 h-4 text-white" />
        </div>
        <div className="flex flex-col leading-tight">
          <h1 className="font-heading text-xl text-text">Zafira</h1>
          <p className="text-primary text-xs font-medium">Solidaire</p>
        </div>
      </div>

      {/* Desktop navbar */}
      <div className="hidden md:flex items-center gap-6">
        <a
          href="#actions"
          className="text-text hover:text-primary transition-colors"
        >
          Actions
        </a>
        <a
          href="#about"
          className="text-text hover:text-primary transition-colors"
        >
          À propos
        </a>
        <a
          href="#contact"
          className="text-text hover:text-primary transition-colors"
        >
          Contact
        </a>

        {/* Auth section */}
        {!user ? (
          <LoginDialog />
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-sm text-text">
              Bonjour, <strong>{user.firstName || user.email}</strong>
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="border-primary text-primary hover:bg-primary hover:text-white transition"
            >
              Déconnexion
            </Button>
          </div>
        )}
      </div>

      {/* Mobile navbar */}
      <div className="md:hidden flex items-center gap-2">
        {!user ? (
          <Button
            variant="connect"
            size="sm"
            onClick={() => router.push('/login')}
            className="px-3 py-2"
          >
            Connexion
          </Button>
        ) : (
          <Button
            variant="connect"
            size="sm"
            onClick={logout}
          >
            Déconnexion
          </Button>
        )}

        <MobileMenu />
      </div>
    </nav>
  );
}
