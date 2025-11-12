'use client';

import React from 'react';
import { CheckSquare, Gift, Heart, Euro, Home, Info } from 'lucide-react';
import ParticipationCard from '@/components/uiStyled/participation-section-card';

export default function ParticipationSection() {
  return (
    <section
      id="participation"
      className="py-20 px-6 md:px-16 bg-teal-50 text-[var(--color-text)]"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-text">
        Participer à notre mission
      </h2>
      <p className="text-center text-lg mb-12 text-black">
        Chaque geste compte pour redonner confiance et dignité
      </p>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Donner des vêtements */}
        <ParticipationCard
          type="clothing"
          icon={<Gift className="text-blue-500 w-6 h-6" />}
          title="Donner des vêtements"
          description="Points de collecte dans toute la ville"
          miniCards={[
            {
              icon: <CheckSquare className="text-blue-500 w-5 h-5" />,
              title: 'Vêtements professionnels',
              description: 'Vêtements adaptés au travail',
            },
            {
              icon: <CheckSquare className="text-blue-500 w-5 h-5" />,
              title: 'En bon état',
              description: 'Vêtements propres et réutilisables',
            },
            {
              icon: <CheckSquare className="text-blue-500 w-5 h-5" />,
              title: 'Toutes tailles',
              description: 'Du XS au XXL',
            },
            {
              icon: <Home className="text-blue-500 w-5 h-5" />,
              title: 'Point de dépôt près de chez vous',
              description: '123 rue de la Solidarité, Paris',
            },
          ]}
        />

        {/* Soutenir financièrement */}
        <ParticipationCard
          type="donation"
          icon={<Heart className="text-red-500 w-6 h-6" />}
          title="Soutenir financièrement"
          description="Votre don a un impact direct"
          miniCards={[
            {
              icon: <Info className="text-red-500 w-5 h-5" />,
              title: (
                <a
                  className="text-black hover:underline rouded-full font-medium flex items-center gap-2"
                >
                  Formulaire HelloAsso
                </a>
              ),
              description:
                'Remplissez notre formulaire sécurisé de don en ligne',
            },
            {
              icon: <Gift className="text-red-500 w-5 h-5" />,
              title: (
                <a
                  className="text-black hover:underline font-medium flex items-center gap-2"
                >
                  Faire un don
                </a>
              ),
              description: 'Accédez à notre page officielle sur HelloAsso',
            },
            {
              icon: <Euro className="text-red-500 w-5 h-5" />,
              title: 'Avantage fiscal',
              description: 'Réduction d’impôts selon la législation en vigueur',
            },
          ]}
        />
      </div>
    </section>
  );
}
