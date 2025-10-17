// components/ui-styled/action-section-button.tsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface ActionSectionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

export default function ActionSectionButton({
  children,
  onClick,
  href,
}: ActionSectionButtonProps) {
  const btn = (
    <Button
      className="rounded-full bg-[var(--color-secondary)] text-white px-6 py-2 text-sm font-medium hover:bg-[var(--color-secondary-hover)] transition-colors"
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
