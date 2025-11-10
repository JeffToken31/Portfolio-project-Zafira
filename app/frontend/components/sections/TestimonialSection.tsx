'use client';

import {useState, useEffect, useCallback} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import TestimonialCard from '@/components/uiStyled/testimonial-section-card';
import {getTestimonials, TestimonialDto} from '@/lib/api/testimonials';

export default function TestimonialSection() {
  const [testimonials, setTestimonials] = useState<TestimonialDto[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  // 🔹 Récupération des témoignages validés et publiés
  useEffect(() => {
    let active = true;
    async function fetchTestimonials() {
      try {
        const data = await getTestimonials({validated: true, published: true});
        if (active) setTestimonials(data);
      } catch (err) {
        console.error('Erreur lors du chargement des témoignages', err);
      } finally {
        if (active) setLoading(false);
      }
    }
    fetchTestimonials();
    return () => {
      active = false;
    };
  }, []);

  // 🔁 Navigation du slider
  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, [testimonials.length]);

  // 🔄 Auto-défilement toutes les 5s
  useEffect(() => {
    if (!testimonials.length) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, testimonials.length]);

  if (loading)
    return <p className="text-center">Chargement des témoignages...</p>;
  if (!testimonials.length)
    return (
      <p className="text-center">Aucun témoignage disponible pour le moment.</p>
    );

  return (
    <section
      id="temoignages"
      className="py-20 px-6 md:px-16 bg-bg text-[var(--color-text)]"
    >
      {/* 🏷️ Titre */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-text">
        Témoignages de nos bénéficiaires
      </h2>

      {/* 🎠 Carte Témoignage */}
      <div className="relative max-w-4xl mx-auto">
        {/* Flèche gauche */}
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:bg-accent z-10"
        >
          <ChevronLeft className="w-6 h-6 text-[var(--color-primary)]" />
        </button>

        {/* Carte animée avec gestures */}
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={current}
            initial={{opacity: 0, x: 60}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: -60}}
            transition={{type: 'spring', stiffness: 80, damping: 25}}
            drag="x"
            dragConstraints={{left: 0, right: 0}}
            dragElastic={0.2}
            onDragEnd={(event, info) => {
              if (info.offset.x < -50) next();
              else if (info.offset.x > 50) prev();
            }}
            className="mx-auto"
          >
            <TestimonialCard testimonial={testimonials[current]} />
          </motion.div>
        </AnimatePresence>

        {/* Flèche droite */}
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:bg-accent z-10"
        >
          <ChevronRight className="w-6 h-6 text-[var(--color-primary)]" />
        </button>
      </div>

      {/* 🔘 Indicateurs dynamiques */}
      <div className="flex justify-center mt-6 gap-3">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              current === index ? 'bg-secondary' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
