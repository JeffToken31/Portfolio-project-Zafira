// app/dashboard/layout.tsx
'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import HeaderDashboard from '../../../components/dashboard/HeaderDashboard';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isDev = process.env.NODE_ENV === 'development';
    const token = localStorage.getItem('userToken');
    const role = localStorage.getItem('userRole');

    if (!token || role !== 'beneficiaire') {
      if (!isDev) {
        router.push('/login');
      } else {
        console.log('[DEV] Dashboard bénéficiaire accessible sans login');
        setLoading(false);
        return;
      }
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">Chargement du dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header du dashboard bénéficiaire */}
      <HeaderDashboard />

      {/* Contenu principal */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
