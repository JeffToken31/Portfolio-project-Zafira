'use client';

import Link from 'next/link';
import React from 'react';

interface PartnersButtonProps {
  children: React.ReactNode;
  href: string;
  variant?: 'primary' | 'light';
}

export default function PartnersButton({ children, href, variant = 'primary' }: PartnersButtonProps) {
  const baseClasses =
    'px-6 py-3 rounded-full font-semibold transition-colors duration-300 inline-block';

  const variantClasses =
    variant === 'light'
      ? 'bg-white text-pink-500 hover:bg-pink-100'
      : 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]';

  return (
    <Link href={href} className={`${baseClasses} ${variantClasses}`}>
      {children}
    </Link>
  );
}
