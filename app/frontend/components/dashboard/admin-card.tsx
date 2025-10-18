'use client';

import React from 'react';

interface AdminCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

export default function AdminCard({ icon, label, value }: AdminCardProps) {
  return (
    <div className="bg-[var(--color-surface)] rounded-lg shadow-lg p-6 flex flex-col items-center gap-3">
      <div className="text-[var(--color-primary)]">{icon}</div>
      <p className="text-sm text-[var(--color-text-dark)]">{label}</p>
      <h3 className="text-2xl font-bold text-[var(--color-text)]">{value}</h3>
    </div>
  );
}
