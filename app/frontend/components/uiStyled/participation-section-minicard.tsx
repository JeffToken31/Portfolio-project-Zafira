'use client';

import React from 'react';

interface ParticipationMiniCardProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
}

export default function ParticipationMiniCard({
  icon,
  title,
  description,
}: ParticipationMiniCardProps) {
  return (
    <div className="flex items-start gap-3">
      {icon && <div className="flex-shrink-0">{icon}</div>}
      <div className="flex flex-col">
        <h4 className="font-semibold text-[var(--color-text)]">{title}</h4>
        {description && (
          <p className="text-black text-sm leading-snug mt-1">{description}</p>
        )}
      </div>
    </div>
  );
}
