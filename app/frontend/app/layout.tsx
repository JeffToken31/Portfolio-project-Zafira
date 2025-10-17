// app/layout.tsx
import './globals.css';
import {ReactNode} from 'react';
import Footer from '@/components/layout/Footer';


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
        {/* Navbar fixe */}


        {/* Contenu dynamique des pages */}
        <main className="min-h-[calc(100vh-100px)]">{children}</main>

        {/* Footer global */}
        <Footer />
      </body>
    </html>
  );
}
