'use client';

import React from 'react';
import Link from 'next/link';

interface AdminButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary';
}

export default function AdminButton({ children, href, variant = 'primary' }: AdminButtonProps) {
  const baseClasses = 'rounded-lg px-4 py-2 font-medium transition-colors';
  const variantClasses =
    variant === 'primary'
      ? 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]'
      : 'bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary-hover)]';

  const button = <button className={`${baseClasses} ${variantClasses}`}>{children}</button>;

  if (href) {
    return <Link href={href}>{button}</Link>;
  }

  return button;
}
