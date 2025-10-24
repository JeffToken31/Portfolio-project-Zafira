'use client';

import * as React from 'react';
import {motion} from 'framer-motion';
import PartnersCard from '@/components/uiStyled/partners-section-card';
import PartnersButton from '@/components/uiStyled/partners-section-button';
import Image from 'next/image';
import {getPartners, PartnerDto} from '@/lib/api/partners';

export default function PartnersSection() {
  const [partners, setPartners] = React.useState<PartnerDto[]>([]);

  React.useEffect(() => {
    async function fetchPartners() {
      try {
        const data = await getPartners();
        setPartners(data);
      } catch (err) {
        console.error('Erreur récupération partenaires', err);
      }
    }
    fetchPartners();
  }, []);

  // --- Carousel settings ---
  const logos = partners.map((p) => p.logoUrl).filter(Boolean);
  const duplicateLogos = [...logos, ...logos]; // pour un scroll infini

  return (
    <section
      id="partners"
      className="py-20 px-6 md:px-16 bg-[var(--color-bg-alt)] text-text"
    >
      {/* Titre principal */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-text">
        Ensemble, nous allons plus loin
      </h2>

      <p className="text-center text-black mb-12">
        Découvrez le réseau de partenaires qui nous accompagne dans notre
        mission.
      </p>
      <h3 className="text-2xl font-bold text-center text-text mb-10">
        Nos partenaires principaux
      </h3>

      {/* Partnercards */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <PartnersCard
          logo="/images/france-travail.png"
          name="France Travail"
          type="Institution publique"
          typeColor="text-blue-600"
          description="Partenaire principal pour l’orientation des demandeurs d’emploi."
        />
        <PartnersCard
          logo="/images/missions-locales.png"
          name="Missions Locales"
          type="Insertion jeunesse"
          typeColor="text-orange-500"
          description="Accompagnement des 16–25 ans en insertion."
        />
        <PartnersCard
          logo="/images/ccas.png"
          name="CCAS"
          type="Sociale"
          typeColor="text-pink-600"
          description="Centre communal d’action sociale de la ville."
        />
      </div>

      <h3 className="text-2xl font-bold text-center text-text mb-8">
        Nos partenaires et donateurs
      </h3>

      {/* Carousel logos */}
      {logos.length > 0 && (
        <div className="overflow-hidden py-24">
          <motion.div
            className="flex gap-12"
            animate={{x: [-logos.length * 120, 0]}}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: logos.length * 3,
                ease: 'linear',
              },
            }}
          >
            {duplicateLogos.map((logoUrl, index) => (
              <div key={index} className="w-24 h-24 flex-shrink-0 relative">
                <Image
                  src={logoUrl!}
                  alt={`Logo partenaire ${index + 1}`}
                  fill
                  style={{objectFit: 'contain'}}
                />
              </div>
            ))}
          </motion.div>
        </div>
      )}

      {/* final card */}
      <div className="bg-pink-500 text-white rounded-xl p-10 text-center max-w-3xl mx-auto shadow-lg">
        <h3 className="text-2xl font-bold mb-4">
          Devenez partenaire ou donateur de Zafira Solidaire
        </h3>
        <p className="mb-6">
          Vous souhaitez donner de la visibilité à votre engagement sur notre
          site ? Participez à notre réseau de partenaires et donateurs en
          transmettant votre logo. Contactez-nous à{' '}
          <a href="mailto:zafira@gmail.com" className="underline">
            zafira@gmail.com
          </a>{' '}
          pour figurer parmi nos soutiens.
        </p>
        <PartnersButton href="mailto:zafira@gmail.com" variant="light">
          Nous contacter
        </PartnersButton>
      </div>
    </section>
  );
}
