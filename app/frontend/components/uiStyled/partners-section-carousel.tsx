'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { usePartners } from '@/lib/hooks/usePartners';

export default function PartnersSectionCarousel() {
  const { partners, loading, error } = usePartners(5);

  if (loading) return <p className="text-center py-20">Chargement des partenaires...</p>;
  if (error)
    return (
      <p className="text-center py-20 text-red-500">
        Impossible de charger les partenaires : {error}
      </p>
    );
  if (partners.length === 0)
    return <p className="text-center py-20">Aucun partenaire disponible.</p>;

  return (
    <section id="partners" className="py-20 bg-[var(--color-bg-alt)] text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-12">
        Nos Partenaires
      </h2>
      <div className="flex justify-center">
        <Carousel className="w-full max-w-2xl">
          <CarouselContent>
            {partners.map((partner) => (
              <CarouselItem key={partner.id}>
                <div className="p-4">
                  <Card className="bg-[var(--color-surface)] shadow-md rounded-2xl overflow-hidden">
                    {partner.logoUrl && (
                      <img
                        src={partner.logoUrl}
                        alt={partner.name}
                        className="w-full h-64 object-contain p-4"
                      />
                    )}
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">
                        {partner.name}
                      </h3>
                      {partner.website && (
                        <a
                          href={partner.website}
                          target="_blank"
                          className="text-[var(--color-primary)] hover:underline"
                        >
                          Voir le site
                        </a>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-[var(--color-primary)]" />
          <CarouselNext className="text-[var(--color-primary)]" />
        </Carousel>
      </div>
    </section>
  );
}
