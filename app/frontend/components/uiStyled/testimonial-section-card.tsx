'use client';

import {Quote} from 'lucide-react';
import type {TestimonialDto} from '@/lib/api/testimonials';

interface TestimonialCardProps {
  testimonial: TestimonialDto;
}

export default function TestimonialCard({testimonial}: TestimonialCardProps) {
  return (
    <div className="py-12 bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row items-center gap-8">
      {/* 👩 Partie gauche */}
      <div className="flex flex-col items-center text-center md:w-1/3">
        <h3 className="text-lg font-semibold text-[var(--color-primary)]">
          {testimonial.authorName || 'Anonyme'}
        </h3>
      </div>

      {/* 💬 Partie droite */}
      <div className="md:w-2/3 text-gray-800 text-left relative">
        <Quote className="absolute -top-3 -left-2 w-6 h-6 text-pink-500 opacity-70" />
        <p className="italic leading-relaxed pl-6">“{testimonial.content}”</p>
      </div>
    </div>
  );
}
