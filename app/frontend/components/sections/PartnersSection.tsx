'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import PartnersCard from '@/components/uiStyled/partners-section-card';
import PartnersButton from '@/components/uiStyled/partners-section-button';
import { getPartners, PartnerDto } from '@/lib/api/partners';

export default function PartnersSection() {
  const [partners, setPartners] = React.useState<PartnerDto[]>([]);
  const [viewportWidth, setViewportWidth] = React.useState(1200);

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

    // Détecter la largeur de l’écran pour ajuster la vitesse
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Logos pour le carrousel ---
  const logos = partners.map((p) => p.logoUrl).filter(Boolean);
  const duplicatedLogos = [...logos, ...logos]; // duplication pour boucle infinie
  const logoSize = 120; // taille des logos
  const gap = 160; // espace horizontal entre les logos
  const baseDuration = 15; // durée de référence pour 1 boucle

  // Calcul adaptatif de la vitesse selon nombre de logos et largeur écran
  const duration =
    logos.length > 0
      ? Math.max(baseDuration, logos.length * 5 * (1200 / viewportWidth))
      : baseDuration;

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
        Découvrez le réseau de partenaires qui nous accompagne dans notre mission.
      </p>

      {/* Cards fixes */}
      <h3 className="text-2xl font-bold text-center text-text mb-10">
        Nos partenaires principaux
      </h3>
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <PartnersCard
          logo="/Logo FranceTravail.png"
          name="France Travail"
          type="Institution publique"
          typeColor="text-blue-600"
          description="Partenaire principal pour l’orientation des demandeurs d’emploi."
        />
        <PartnersCard
          logo="/Logo MissionsLocales.png"
          name="Missions Locales"
          type="Insertion jeunesse"
          typeColor="text-orange-500"
          description="Accompagnement des 16–25 ans en insertion."
        />
        <PartnersCard
          logo="/Logo CCAS Aulnay.png"
          name="CCAS"
          type="Sociale"
          typeColor="text-pink-600"
          description="Centre communal d’action sociale de la ville."
        />
      </div>

      {/* Carrousel fluide de logos */}
      {logos.length > 0 && (
        <div className="relative w-full overflow-hidden py-12">
          <motion.div
            className="flex"
            style={{ gap: gap }}
            animate={{ x: [- (logoSize + gap) * logos.length, 0] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: duration,
                ease: 'linear',
              },
            }}
          >
            {duplicatedLogos.map((logoUrl, index) => (
              <div
                key={index}
                className="flex-shrink-0 relative"
                style={{ width: logoSize, height: logoSize }}
              >
                <Image
                  src={logoUrl!}
                  alt={`Logo partenaire ${index + 1}`}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            ))}
          </motion.div>
        </div>
      )}

      {/* Final card */}
      <div className="bg-pink-500 text-white rounded-xl p-10 text-center max-w-3xl mx-auto shadow-lg mt-16">
        <h3 className="text-2xl font-bold mb-4">
          Devenez partenaire ou donateur de Zafira Solidaire
        </h3>
        <p className="mb-6">
          Vous souhaitez donner de la visibilité à votre engagement sur notre site ?
          Participez à notre réseau de partenaires et donateurs en transmettant votre logo.
          Contactez-nous à{' '}
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
