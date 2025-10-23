'use client';
import { Button } from '@/components/uiStyled/button';
import { useState, useEffect, useRef } from 'react';
import { LogOut, User, Users } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function UserMenuDialog() {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Fermer si clic en dehors
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}   // ouvre au hover desktop
      onMouseLeave={() => setOpen(false)} // ferme au leave desktop
    >
      <Button
        onClick={() => setOpen(!open)}
        variant='connect'
      >
        Mon profil
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50 overflow-hidden"
          >
            <Link
              href="/dashboard/user"
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors"
            >
              <User className="w-4 h-4" /> Mon profil utilisateur
            </Link>
            <Link
              href="/dashboard/beneficiary"
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors"
            >
              <Users className="w-4 h-4" /> Mon espace bénéficiaire
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Déconnexion
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
