'use client';

import LoginForm from '@/components/forms/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-6">
      <div className="max-w-md w-full p-6 rounded-lg bg-white shadow-md">
        <h1 className="text-xl font-heading mb-4">Se connecter</h1>
        <LoginForm />
      </div>
    </div>
  );
}
