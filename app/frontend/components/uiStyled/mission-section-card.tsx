'use client';

import React from 'react';

interface MissionMiniCardProps {
  icon: React.ReactNode;
  title: string;
  description: string; // ← optionnel mais bien utilisé
}

export default function MissionMiniCard({
  icon,
  title,
  description,
}: MissionMiniCardProps) {
  return (
    <div className="flex items-start gap-4 bg-[var(--color-surface)] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex-shrink-0 p-2 bg-[var(--color-bg-alt)] rounded-full">
        {icon}
      </div>
      <div className="flex flex-col">
        <h4 className="font-semibold text-[var(--color-text)] mb-1">{title}</h4>
        {description && (
          <p className="text-sm text-[var(--color-text-dark)] leading-snug">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
