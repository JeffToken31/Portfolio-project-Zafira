// components/section/hero-section-button.tsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface HeroSectionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

export default function HeroSectionButton({ children, onClick, href }: HeroSectionButtonProps) {
  const btn = (
    <Button
      className="rounded-full bg-[var(--color-primary)] text-white px-8 py-3 hover:bg-[var(--color-primary-hover)] transition-colors"
      size="lg"
      variant="default"
      onClick={onClick}
    >
      {children}
    </Button>
  );

  if (href) {
    return <a href={href}>{btn}</a>;
  }

  return btn;
}
