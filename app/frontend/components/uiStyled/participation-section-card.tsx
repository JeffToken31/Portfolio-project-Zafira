'use client';

import React from 'react';
import ParticipationMiniCard from './participation-section-minicard';
import ParticipationButton from './participation-section-button';
import { Phone } from 'lucide-react';

interface ParticipationCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  miniCards?: { title: string; description?: string; icon?: React.ReactNode }[];
  type: 'clothing' | 'donation';
}

export default function ParticipationCard({
  icon,
  title,
  description,
  miniCards,
  type,
}: ParticipationCardProps) {
  return (
    <div className="bg-[var(--color-surface)] rounded-lg shadow-lg p-6 flex flex-col gap-6">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h3 className="text-xl font-bold text-[var(--color-primary)]">{title}</h3>
      </div>

      <p className="text-black">{description}</p>

      {miniCards && (
        <div className="space-y-3 mt-4">
          {miniCards.map((card, i) => (
            <ParticipationMiniCard
              key={i}
              icon={card.icon}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      )}

      {/* Boutons */}
      {type === 'clothing' ? (
  <div className="flex justify-between items-center gap-4 mt-6">
    <ParticipationButton href="/points-collecte" width="half">
      Tous
    </ParticipationButton>
    <ParticipationButton
      href="tel:+33123456789"
      variant="secondary"
      width="half"
      icon={<Phone className="w-4 h-4" />}
    >
      Nous appeler
    </ParticipationButton>
  </div>
) : (
  <div className="flex flex-col gap-4 mt-6">
    <ParticipationButton href="/don-helloasso" width="full">
      Faire un don Hello Asso
    </ParticipationButton>
    <ParticipationButton href="/don-mensuel" variant="secondary" width="full">
      Dons mensuels
    </ParticipationButton>
  </div>
)}
    </div>
  );
}
