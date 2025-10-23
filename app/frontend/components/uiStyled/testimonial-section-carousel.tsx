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
import { useTestimonials } from '@/lib/hooks/usePendingTestimonialsCount';

export default function TestimonialSectionCarousel() {
  const { testimonials, loading, error } = useTestimonials(5);

  if (loading)
    return <p className="text-center py-20">Chargement des témoignages...</p>;
  if (error)
    return (
      <p className="text-center py-20 text-red-500">
        Impossible de charger les témoignages : {error}
      </p>
    );
  if (testimonials.length === 0)
    return <p className="text-center py-20">Aucun témoignage disponible.</p>;

  return (
    <section id="testimonials" className="py-20 bg-[var(--color-bg-alt)] text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-12">
        Témoignages
      </h2>
      <div className="flex justify-center">
        <Carousel className="w-full max-w-2xl">
          <CarouselContent>
            {testimonials.map((t) => (
              <CarouselItem key={t.id}>
                <div className="p-4">
                  <Card className="bg-[var(--color-surface)] shadow-md rounded-2xl overflow-hidden">
                    <CardContent className="p-6">
                      <p className="text-[var(--color-text-light)] mb-4">{t.content}</p>
                      <h3 className="text-lg font-semibold text-[var(--color-text)]">
                        {t.author}
                      </h3>
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
