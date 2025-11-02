'use client';

import './globals.css';
import {ReactNode, useEffect} from 'react';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import {AuthProvider} from '@/lib/context/AuthContext';
import {recordVisit} from '@/lib/api/stats';
import ScrollToTopButton from '@/components/uiStyled/scrollToTopButton';

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({children}: LayoutProps) {
  useEffect(() => {
    const visitedKey = 'lastVisit';
    const now = new Date();
    const lastVisitStr = localStorage.getItem(visitedKey);

    let shouldRecord = true;

    if (lastVisitStr) {
      const lastVisit = new Date(lastVisitStr);
      const diffMs = now.getTime() - lastVisit.getTime();
      const diffMinutes = diffMs / 1000 / 60;

      if (diffMinutes < 30) shouldRecord = false;
    }

    if (shouldRecord) {
      recordVisit().catch((err) =>
        console.error('Erreur en enregistrant la visite', err)
      );
      localStorage.setItem(visitedKey, now.toISOString());
    }
  }, []);

  return (
    <html lang="fr">
      <head>
        <title>Zafira Solidaire</title>
        <meta name="description" content="Redonner confiance par l'image" />
      </head>
      <body className="bg-bg-alt text-text antialiased">
        <AuthProvider>
          <Navbar />
          <main className="min-h-[calc(100vh-100px)]">{children}</main>
          <Footer />
          <ScrollToTopButton />
        </AuthProvider>
      </body>
    </html>
  );
}
