'use client';

import {useRouter} from 'next/navigation';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import * as authApi from '@/lib/api/auth';

interface User {
  id: string;
  email: string;
  role: string;
  firstName: string;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: {email: string; password: string}) => Promise<void>;
  register: (payload: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  loginWithGoogle: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Check if cookie exist and keep data when loading
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await authApi.fetchUser();
        setUser(res.user);
      } catch {
        setUser(null);
      }
    }
    fetchUser();
  }, []);

  const login = async (credentials: {email: string; password: string}) => {
    const data = await authApi.login(credentials);
    setUser(data.user);
  };

  const register = async (payload: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  }) => {
    const data = await authApi.register(payload);
    setUser(data.user);
  };

const logout = async () => {
  try {
    await authApi.logout();
    setUser(null);
    router.push('/');
  } catch (err) {
    console.error('Logout failed', err);
  }
};

  const loginWithGoogle = () => {
    authApi.loginWithGoogle();
  };

  return (
    <AuthContext.Provider
      value={{user, login, register, logout, loginWithGoogle}}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook pratique
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error('useAuthContext must be used within AuthProvider');
  return context;
};
