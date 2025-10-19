'use client';

import * as React from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogTitle,
} from './dialog';
import {Button} from './button';
import LoginForm from '../forms/LoginForm';
import {useAuth} from '@/lib/hooks/useAuth';

export default function LoginDialog() {
  const {user, logout} = useAuth();
  const [open, setOpen] = React.useState(false);

  // close modal if user is connected
  React.useEffect(() => {
    if (user) setOpen(false);
  }, [user]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!user ? (
        <>
          <DialogTrigger asChild>
            <Button variant="connect" size="sm">
              Connexion
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md w-full p-6 rounded-lg bg-white">
            <DialogTitle className="text-xl font-heading mb-4">
              Se connecter
            </DialogTitle>
            <LoginForm />
            <DialogClose asChild />
          </DialogContent>
        </>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-text font-medium">
            Bonjour, {user.firstName || user.email}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              logout();
              setOpen(false);
            }}
          >
            Déconnexion
          </Button>
        </div>
      )}
    </Dialog>
  );
}
