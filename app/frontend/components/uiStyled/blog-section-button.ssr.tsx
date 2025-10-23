import React from 'react';
import {Button} from '@/components/ui/button';

interface BlogSectionButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export default function BlogSectionButton({
  children,
  href,
  onClick,
}: BlogSectionButtonProps) {
  const btn = (
    <Button
      className="rounded-full bg-[var(--color-primary)] text-white px-6 py-2 hover:bg-[var(--color-primary-hover)] transition-colors"
      size="sm"
      onClick={onClick}
    >
      {children}
    </Button>
  );

  return href ? <a href={href}>{btn}</a> : btn;
}
