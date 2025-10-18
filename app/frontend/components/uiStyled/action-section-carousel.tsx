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
import { useActions } from '@/hooks/useActions';

interface ActionSectionCarouselProps {
  limit?: number;
  useMock?: boolean; // ✅ Permet d'activer le mock
}

export default function ActionSectionCarousel({
  limit = 5,
  useMock = true, // Par défaut mock activé
}: ActionSectionCarouselProps) {
  const { actions, loading, error } = useActions(limit, useMock);

  if (loading) {
    return (
      <p className="text-center py-20 text-[var(--color-primary)] font-semibold">
        Chargement des actions...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center py-20 text-red-500 font-semibold">
        Impossible de charger les actions : {error}
      </p>
    );
  }

  if (!actions || actions.length === 0) {
    return (
      <p className="text-center py-20 text-gray-500 font-medium">
        Aucune action disponible.
      </p>
    );
  }

  return (
    <section id="actions" className="py-20 bg-[var(--color-bg-alt)] text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-12">
        Nos Actions
      </h2>

      <div className="flex justify-center">
        <Carousel className="w-full max-w-2xl">
          <CarouselContent>
            {actions.map((action) => (
              <CarouselItem key={action.id}>
                <div className="p-4">
                  <Card className="bg-[var(--color-surface)] shadow-md rounded-2xl overflow-hidden">
                    {action.imageUrl && (
                      <img
                        src={action.imageUrl}
                        alt={action.title || 'Action'}
                        className="w-full h-64 object-cover"
                      />
                    )}
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">
                        {action.title}
                      </h3>
                      <p className="text-[var(--color-text-light)]">{action.description}</p>
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
