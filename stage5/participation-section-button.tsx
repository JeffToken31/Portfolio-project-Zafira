'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ParticipationButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  width?: 'half' | 'full' | 'custom';
  icon?: React.ReactNode;
  className?: string;
}

export default function ParticipationButton({
  children,
  href,
  onClick,
  variant = 'primary',
  width = 'full',
  icon,
  className = '',
}: ParticipationButtonProps) {
  const baseClasses =
    'rounded-full text-white font-medium flex items-center justify-center gap-2 py-3 transition-colors';
  const variantClasses =
    variant === 'primary'
      ? 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]'
      : 'bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)]';

const widthClass =
    width === 'half'
      ? 'w-[100%]'
      : 'w-full';

  const button = (
    <Button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${widthClass} ${className}`}
    >
      {icon}
      {children}
    </Button>
  );

  if (href)
    return (
      <Link href={href} className={`${widthClass} flex justify-center`}>
        {button}
      </Link>
    );

  return button;
}
