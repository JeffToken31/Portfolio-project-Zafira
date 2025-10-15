'use client';

import * as React from 'react';
import {Dialog, DialogTrigger, DialogContent, DialogClose, DialogTitle} from './dialog';
import { Button } from './button';
import LoginForm from '../forms/LoginForm';

export default function LoginDialog() {
  return (
    <Dialog>
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
        <DialogClose asChild></DialogClose>
      </DialogContent>
    </Dialog>
  );
}
