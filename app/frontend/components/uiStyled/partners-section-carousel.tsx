'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { getPartners, PartnerDto } from '@/lib/api/partners';

export default function PartnersSectionCarousel() {
  const [partners, setPartners] = React.useState<PartnerDto[]>([]);
  const containerRef = React.useRef<HTMLDivElement>(null);

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

  if (partners.length === 0) return null;

  // Largeur fixe du logo et espace entre les logos
  const logoWidth = 120;
  const gap = 100;
  const speed = 50; // pixels/seconde

  return (
    <section className="py-20 bg-[var(--color-bg-alt)] text-center overflow-hidden relative">
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-12">
        Nos Partenaires
      </h2>

      <div
        ref={containerRef}
        className="relative w-full h-[160px] overflow-hidden"
      >
        {partners.map((partner, index) => {
          const totalDistance = (logoWidth + gap) * partners.length; // distance exacte
          const duration = totalDistance / speed;

          return (
            <motion.div
              key={partner.id}
              className="absolute top-1/2 -translate-y-1/2"
              initial={{ x: -index * (logoWidth + gap) }}
              animate={{ x: [ -index * (logoWidth + gap), window.innerWidth - logoWidth - index * (logoWidth + gap) ] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration,
                  ease: 'linear',
                },
              }}
              style={{ width: logoWidth, height: logoWidth }}
            >
              <Image
                src={partner.logoUrl!}
                alt={`Logo partenaire ${partner.id}`}
                fill
                style={{ objectFit: 'contain' }}
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
