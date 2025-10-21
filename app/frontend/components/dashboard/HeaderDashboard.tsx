// components/dashboard/HeaderDashboard.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function HeaderDashboard() {
  const pathname = usePathname();

  return (
    <header className="bg-[var(--color-bg-alt)] p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-[var(--color-primary)]">Dashboard Bénéficiaire</h1>

      <nav className="space-x-4">
        <Link
          href="/dashboard/beneficiary"
          className={pathname === '/dashboard/beneficiary' ? 'font-semibold text-[var(--color-primary)]' : ''}
        >
          Accueil
        </Link>
        <Link
          href="/dashboard/beneficiary/profile"
          className={pathname === '/dashboard/beneficiary/profile' ? 'font-semibold text-[var(--color-primary)]' : ''}
        >
          Modifier mes infos
        </Link>
        <Link
          href="/dashboard/beneficiary/testimonial"
          className={pathname === '/dashboard/beneficiary/testimonial' ? 'font-semibold text-[var(--color-primary)]' : ''}
        >
          Rédiger témoignage
        </Link>
      </nav>
    </header>
  );
}
