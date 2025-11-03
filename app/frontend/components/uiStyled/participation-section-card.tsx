'use client';

import React from 'react';
import ParticipationMiniCard from './participation-section-minicard';
import { Phone, Info, ExternalLink} from 'lucide-react';
import Link from 'next/link';

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
    <div className="bg-bg rounded-lg shadow-lg p-6 flex flex-col gap-6 w-full">
      {/* Titre principal */}
      <div className="flex flex-col items-center text-center gap-3 mb-2">
        <div className="text-[var(--color-primary)] text-5xl">{icon}</div>
        <h3 className="text-2xl font-bold text-text">{title}</h3>
      </div>

      {/* Description */}
      <p className="text-black text-center">{description}</p>

      {/* Mini-cards : HelloAsso + Avantage fiscal */}
      {miniCards && (
        <div className="space-y-4 mt-4">
          {miniCards.map((card, i) => (
            <ParticipationMiniCard
              key={i}
              icon={
                <div className="flex justify-center text-4xl text-[var(--color-primary)]">
                  {card.icon}
                </div>
              }
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      )}

      {/* Type : Don financier */}
      {type === 'donation' && (
        <div className="mt-8 flex flex-col gap-4 w-full">
          {/* Bouton Formulaire HelloAsso */}
          <Link
            href="/don-helloasso"
            className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition text-center"
          >
            <Info className="w-5 h-5" />
            Formulaire HelloAsso
          </Link>

          {/* Bouton vers le site HelloAsso */}
          <a
            href="https://www.helloasso.com/associations/zafira-vestiaire-solidaire"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 border border-blue-500 text-blue-500 py-3 rounded-full hover:bg-blue-50 transition"
          >
            <ExternalLink className="w-5 h-5" />
            Faire un don
          </a>
        </div>
      )}

      {/* Type : Don de vêtements */}
      {type === 'clothing' && (
        <div className="flex justify-between items-center gap-4 mt-6">
          <Link
            href="/points-collecte"
            className="flex-1 bg-blue-500 text-white text-center py-3 rounded-full hover:bg-blue-600 transition"
          >
            Points de collecte
          </Link>
          <a
            href="tel:+33123456789"
            className="flex-1 flex items-center justify-center gap-2 border border-blue-500 text-blue-500 py-3 rounded-full hover:bg-blue-50 transition"
          >
            <Phone className="w-4 h-4" />
            Nous appeler
          </a>
        </div>
      )}
    </div>
  );
}
