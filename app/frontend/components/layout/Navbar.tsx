'use client';

import { HeartHandshake } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '../uiStyled/button';
import MobileMenu from './MobileMenu';
import LoginDialog from '../uiStyled/LoginDialog';
import UserMenuDialog from "../uiStyled/UserMenuDialog";

export default function Navbar() {
  const router = useRouter();
  const { user } = useAuth();

  const renderUserSection = () => {
    if (!user) return <LoginDialog />;
    return (
      <div className="flex items-center gap-3">
        <UserMenuDialog />
      </div>
    );
  };

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

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-6">
        <a
          href="http://localhost:3000/"
          className="text-text hover:text-primary transition-colors"
        >
          Accueil
        </a>
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
        {renderUserSection()}
      </div>

      {/* Mobile */}
      <div className="md:hidden flex items-center gap-2">
        {renderUserSection()}
        <MobileMenu />
      </div>
    </nav>
  );
}
