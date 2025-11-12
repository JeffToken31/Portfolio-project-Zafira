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
import {Button} from '@/components/uiStyled/button';
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

  const [isLg, setIsLg] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
  );

  useEffect(() => {
    function onResize() {
      setIsLg(window.innerWidth >= 1024);
    }
    window.addEventListener('resize', onResize);
    // appel initial
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    async function fetchActions() {
      try {
        setLoading(true);
        const data = await getActions();
        setActions(limit ? data.slice(0, limit) : data);
      } catch (err) {
        console.error(err);
        setError('Impossible de charger les prestations.');
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
        Aucune prestation disponible.
      </p>
    );

  const emblaOpts = {
    align: isLg ? ('start' as const) : ('center' as const),
    loop: true,
  };


  const carouselKey = isLg ? 'carousel-lg' : 'carousel-sm';

  return (
    <section
      id="actions"
      className="pt-20 bg-[var(--color-bg-alt)] text-center overflow-hidden"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-text mb-12">
        Nos Prestations
      </h2>

      <div className="flex justify-center">
        <Carousel
          key={carouselKey}
          className="w-full max-w-[1200px]"
          opts={emblaOpts}
        >
          <CarouselContent className="flex gap-6">
            {actions.map((action) => (
              <CarouselItem
                key={action.id}
                className="
                  flex-shrink-0
                  basis-[95%]
                  sm:basis-[70%]
                  lg:basis-[48%]
                  mx-auto
                "
              >
                <Card className="bg-bg shadow-md rounded-2xl overflow-hidden flex flex-col h-[450px] transition-transform duration-300 hover:scale-[1.01]">
                  {/* Image */}
                  {action.imageUrl && (
                    <div className="relative flex items-center justify-center w-full h-[250px] overflow-hidden">
                      <Image
                        src={action.imageUrl}
                        alt={action.title || 'Action'}
                        width={500}
                        height={350}
                        className="object-contain max-w-full max-h-full"
                      />
                    </div>
                  )}

                  {/* Text */}
                  <CardContent className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">
                        {action.title}
                      </h3>
                      <p className="text-text text-sm sm:text-base">
                        {action.description}
                      </p>
                    </div>

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
