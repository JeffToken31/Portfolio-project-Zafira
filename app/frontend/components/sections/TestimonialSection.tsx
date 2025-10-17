'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TestimonialCard from '@/components/uiStyled/testimonial-section-card';

export default function TestimonialSection() {
  const testimonials = [
    {
      avatar: '/images/avatar1.jpg',
      name: 'Sophie Martin',
      title: 'Nouvel élan',
      text: 'Grâce à Zafira Solidaire, j’ai retrouvé confiance et un emploi stable. Une équipe formidable et bienveillante !',
    },
    {
      avatar: '/images/avatar2.jpg',
      name: 'Amina Diallo',
      title: 'Accompagnement sur mesure',
      text: 'Un soutien incroyable, à l’écoute de chaque étape de mon parcours. Merci pour cette belle expérience humaine !',
    },
    {
      avatar: '/images/avatar3.jpg',
      name: 'Laura Dupont',
      title: 'Une seconde chance',
      text: 'Les ateliers m’ont aidée à me sentir à nouveau valorisée. C’est une belle opportunité de renaissance personnelle.',
    },
  ];

  const [current, setCurrent] = useState(0);

  // 🔁 Navigation
  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  // 🔄 Auto-défilement toutes les 5 s
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="temoignages" className="py-20 px-6 md:px-16 bg-[var(--color-bg-alt)] text-[var(--color-text)]">
      {/* 🏷️ Titre */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[var(--color-primary)]">
        Témoignages de nos bénéficiaires
      </h2>

      {/* 🎠 Carte Témoignage */}
      <div className="relative max-w-4xl mx-auto">
        {/* Flèche gauche */}
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:bg-gray-100"
        >
          <ChevronLeft className="w-6 h-6 text-[var(--color-primary)]" />
        </button>

        {/* Carte animée */}
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.5 }}
        >
          <TestimonialCard testimonial={testimonials[current]} />
        </motion.div>

        {/* Flèche droite */}
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-2 hover:bg-gray-100"
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
              current === index ? 'bg-pink-500' : 'bg-gray-300'
            }`}
          ></button>
        ))}
      </div>

      {/* 📊 Mini-cartes */}
      <div className="flex flex-wrap justify-center gap-8 mt-12">
        <div className="bg-white rounded-lg shadow-md px-8 py-6 text-center w-56">
          <p className="text-4xl font-bold text-pink-500 mb-2">98%</p>
          <p className="text-black">Satisfaction</p>
        </div>
        <div className="bg-white rounded-lg shadow-md px-8 py-6 text-center w-56">
          <p className="text-4xl font-bold text-blue-500 mb-2">124</p>
          <p className="text-black">Avis positifs</p>
        </div>
      </div>
    </section>
  );
}
