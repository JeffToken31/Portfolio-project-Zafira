'use client';

import React from 'react';

interface AdminActivityCardProps {
  icon: React.ReactNode;
  description: string;
  timeAgo: string;
}

export default function AdminActivityCard({ icon, description, timeAgo }: AdminActivityCardProps) {
  return (
    <div className="bg-[var(--color-surface)] rounded-lg shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        {icon}
        <p className="text-[var(--color-text)]">{description}</p>
      </div>
      <span className="text-sm text-[var(--color-text-dark)]">{timeAgo}</span>
    </div>
  );
}
