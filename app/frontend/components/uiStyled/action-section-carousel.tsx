// components/sections/action-section-carousel.tsx
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

const actions = [
  {
    title: 'Ateliers de confiance en soi',
    description:
      'Des séances pour travailler l’image de soi et reprendre confiance à travers la photo et le coaching.',
    image: '/images/action1.jpg',
  },
  {
    title: 'Accompagnement à la réinsertion',
    description:
      'Soutien personnalisé pour retrouver un emploi et valoriser son parcours professionnel.',
    image: '/images/action2.jpg',
  },
  {
    title: 'Partenariats solidaires',
    description:
      'Collaborations avec entreprises et institutions pour promouvoir l’inclusion sociale.',
    image: '/images/action3.jpg',
  },
];

export default function ActionSectionCarousel() {
  return (
    <section id="actions" className="py-20 bg-[var(--color-bg-alt)] text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-12">
        Nos Actions
      </h2>

      <div className="flex justify-center">
        <Carousel className="w-full max-w-2xl">
          <CarouselContent>
            {actions.map((action, index) => (
              <CarouselItem key={index}>
                <div className="p-4">
                  <Card className="bg-[var(--color-surface)] shadow-md rounded-2xl overflow-hidden">
                    <img
                      src={action.image}
                      alt={action.title}
                      className="w-full h-64 object-cover"
                    />
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">
                        {action.title}
                      </h3>
                      <p className="text-[var(--color-text-light)]">
                        {action.description}
                      </p>
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
