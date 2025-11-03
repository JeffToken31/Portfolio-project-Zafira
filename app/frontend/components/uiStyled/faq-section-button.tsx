'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface FAQSectionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

export default function FAQSectionButton({
  children,
  onClick,
  href,
}: FAQSectionButtonProps) {
  const buttonContent = (
    <Button
      className="rounded-full bg-[var(--color-primary)] text-white px-8 py-3 hover:bg-[var(--color-primary-hover)] transition-colors shadow-md"
      size="lg"
      variant="default"
      onClick={onClick}
    >
      {children}
    </Button>
  );

  if (href) {
    return <a href={href}>{buttonContent}</a>;
  }

  return buttonContent;
}
