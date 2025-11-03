'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, Zap, Users } from 'lucide-react';
import MissionSectionButton from '@/components/uiStyled/mission-section-button';
import MissionMiniCard from '@/components/uiStyled/mission-section-card';
import { useState } from 'react';
import MissionJoinModal from '@/components/uiStyled/mission-join-modal';

export default function MissionSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      id="mission"
      className="py-20 px-6 md:px-16 bg-[var(--color-bg-alt)] text-[var(--color-text)]"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-text">
        Notre mission
      </h2>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="relative">
          <Image
            src="/notre mission1.jpeg"
            alt="Notre mission"
            width={600}
            height={400}
            className="rounded-lg shadow-lg object-cover w-full h-full"
          />
          <div className="absolute bottom-4 right-4 bg-[var(--color-accent)] text-text px-4 py-2 rounded-lg shadow-md">
            <p className="font-semibold text-sm">Depuis 2020</p>
            <p className="text-xs opacity-90">+300 accompagnements</p>
          </div>
        </div>

        {/* Texte et mini cartes */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <p className="text-lg mb-6 text-[var(--color-background-alt)]">
            Offrir à chaque personne en réinsertion la possibilité de se
            reconstruire à travers une image valorisante et bienveillante.
          </p>

          <p className="mb-8">
            Zafira Solidaire agit pour redonner confiance, dignité et
            opportunités à travers des actions concrètes : ateliers d’image,
            accompagnement individuel et partenariats durables.
          </p>

          <div className="space-y-4 mb-10">
            <MissionMiniCard
              icon={<Heart className="text-pink-500" />}
              title="Bienveillance"
              description="Accompagner chaque personne avec écoute et respect."
            />
            <MissionMiniCard
              icon={<Zap className="text-yellow-400" />}
              title="Efficacité"
              description="Allier expertise et impact pour des résultats durables."
            />
            <MissionMiniCard
              icon={<Users className="text-blue-400" />}
              title="Solidarité"
              description="Construire ensemble une société plus inclusive."
            />
          </div>
        </motion.div>
      </div>

      {/* Bouton centré sous les cartes */}
      <div className="flex justify-center mt-12">
        <MissionSectionButton
          onClick={() => setIsModalOpen(true)}
          variant="secondary"
        >
          Nous rejoindre
        </MissionSectionButton>
      </div>

      <MissionJoinModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
