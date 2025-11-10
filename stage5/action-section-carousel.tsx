'use client';

import {useEffect, useState} from 'react';
import {Card, CardContent} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {getActions, ActionDto} from '@/lib/api/actions';
import Image from 'next/image';
import { Button } from '@/components/uiStyled/button'
import Link from 'next/link';

interface ActionSectionCarouselProps {
  limit?: number;
}

export default function ActionSectionCarousel({
  limit = 5,
}: ActionSectionCarouselProps) {
  const [actions, setActions] = useState<ActionDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchActions() {
      try {
        setLoading(true);
        const data = await getActions();
        setActions(limit ? data.slice(0, limit) : data);
      } catch (err) {
        console.error(err);
        setError('Impossible de charger les actions.');
      } finally {
        setLoading(false);
      }
    }

    fetchActions();
  }, [limit]);

  if (loading)
    return (
      <p className="text-center py-20 text-[var(--color-primary)] font-semibold">
        Chargement des prestations...
      </p>
    );

  if (error)
    return (
      <p className="text-center py-20 text-red-500 font-semibold">{error}</p>
    );

  if (!actions.length)
    return (
      <p className="text-center py-20 text-gray-500 font-medium">
        Aucune prestations disponible.
      </p>
    );

  return (
    <section
      id="actions"
      className="pt-20 bg-[var(--color-bg-alt)] text-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-text mb-12">
        Nos Prestations
      </h2>

      <div className="flex justify-center overflow-x-auto touch-pan-x">
        <Carousel className="w-full max-w-2xl flex-none">
          <CarouselContent className="flex gap-4">
            {actions.map((action) => (
              <CarouselItem
                key={action.id}
                className="flex-shrink-0 w-full sm:w-80"
              >
                <Card className="bg-bg shadow-md rounded-2xl overflow-hidden flex flex-col h-[450px]">
                  {/* Conteneur image avec ratio fixe */}
                  {action.imageUrl && (
                    <div className="relative w-full h-[200px] sm:h-[220px] md:h-[250px] lg:h-[280px]">
                      <Image
                        src={action.imageUrl}
                        alt={action.title || 'Action'}
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                        className="rounded-t-2xl"
                      />
                    </div>
                  )}

                  {/* Contenu texte */}
                  <CardContent className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">
                        {action.title}
                      </h3>
                      <p className="text-text text-sm sm:text-base">
                        {action.description}
                      </p>
                    </div>

                    {/* Bouton centré en bas */}
                    <div className="flex justify-center mt-4">
                      <Link href={`/actions/${action.id}`}>
                        <Button variant="blog">Découvrir</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>


          <CarouselPrevious className="text-text" />
          <CarouselNext className="text-text" />
        </Carousel>
      </div>
    </section>
  );
}
