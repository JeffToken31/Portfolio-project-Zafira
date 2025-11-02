'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { getPartners, PartnerDto } from '@/lib/api/partners';

export default function PartnersSectionCarousel() {
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

  const logos = partners.map((p) => p.logoUrl).filter(Boolean);

  if (logos.length === 0) return null;

  const logoSize = 120; // taille du logo
  const gap = 160; // distance horizontale entre les logos
  const baseSpeed = 40; // durée moyenne d’un cycle complet

  return (
    <section className="py-20 bg-[var(--color-bg-alt)] text-center overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-12">
        Nos Partenaires
      </h2>

{logos.length > 0 && (
  <div className="relative w-full overflow-hidden">
    <motion.div
      className="flex"
      style={{ gap: gap }}
      animate={{ x: [- (logoSize + gap) * logos.length, 0] }}
      transition={{
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: Math.max(15, logos.length * 5), // vitesse adaptative
          ease: 'linear',
        },
      }}
    >
      {/* On duplique les logos pour boucle continue */}
      {[...logos, ...logos].map((logoUrl, index) => (
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
    </section>
  );
}
