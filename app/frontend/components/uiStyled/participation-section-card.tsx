'use client';

import React from 'react';
import ParticipationMiniCard from './participation-section-minicard';
import { Phone, ExternalLink } from 'lucide-react';

interface ParticipationCardProps {
  icon: React.ReactNode;
  title: string | React.ReactNode;
  description: string;
  miniCards?: { title: string | React.ReactNode; description?: string; icon?: React.ReactNode }[];
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
    <div className="bg-bg rounded-lg shadow-lg p-6 flex flex-col justify-between w-full">
      <div>
        {/* En-tête de la carte */}
        <div className="flex flex-col items-center text-center gap-3 mb-4">
          <div className="text-[var(--color-primary)] text-5xl">{icon}</div>
          <h3 className="text-2xl font-bold text-text">{title}</h3>
        </div>

        {/* Description */}
        <p className="text-black text-center mb-6">{description}</p>

        {/* Mini-cards */}
        {miniCards && (
          <div className="space-y-4">
            {miniCards.map((card, i) => (
              <ParticipationMiniCard
                key={i}
                icon={
                  <div className="flex justify-center text-4xl text-[var(--color-primary)]">
                    {card.icon}
                  </div>
                }
                title={card.title as string}
                description={card.description}
              />
            ))}
          </div>
        )}
      </div>

      {/* Boutons en bas de la carte */}
      <div className="mt-8">
        {type === 'donation' && (
          <a
            href="https://www.helloasso.com/associations/zafira-vestiaire-solidaire"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#38b6ff] text-white px-6 py-3 rounded-full hover:bg-blue-600 transition text-center"
          >
            <ExternalLink className="w-5 h-5" />
            Faire un don
          </a>
        )}

        {type === 'clothing' && (
          <a
            href="tel:+33123456789"
            className="w-full flex items-center justify-center gap-2 border border-blue-500 text-blue-500 py-3 rounded-full hover:bg-blue-50 transition"
          >
            <Phone className="w-4 h-4" />
            Nous appeler
          </a>
        )}
      </div>
    </div>
  );
}
