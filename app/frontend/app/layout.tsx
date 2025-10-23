'use client';
import './globals.css';
import {ReactNode} from 'react';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import {AuthProvider} from '@/lib/context/AuthContext';
import {usePartners} from '@/lib/hooks/usePartners';
import {useBlog} from '@/lib/hooks/useBlog';
import {useTestimonials} from '@/lib/hooks/usePendingTestimonialsCount';

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({children}: LayoutProps) {
  return (
    <html lang="fr">
      <head>
        <title>Zafira Solidaire</title>
        <meta name="description" content="Redonner confiance par l'image" />
      </head>
      <body className="bg-[var(--color-bg)] text-[var(--color-text)] antialiased">
        <AuthProvider>
          <Navbar />
          <main className="min-h-[calc(100vh-100px)]">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
