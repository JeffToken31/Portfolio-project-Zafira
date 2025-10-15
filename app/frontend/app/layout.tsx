'use client';
import './globals.css';
import {ReactNode} from 'react';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

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
        <Navbar />
        <main className="min-h-[calc(100vh-100px)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
