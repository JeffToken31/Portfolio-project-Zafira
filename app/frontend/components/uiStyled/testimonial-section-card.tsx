'use client';

import Image from 'next/image';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: {
    avatar: string;
    name: string;
    title: string;
    text: string;
  };
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row items-center gap-8">
      {/* 👩 Partie gauche */}
      <div className="flex flex-col items-center text-center md:w-1/3">
        <Image
          src={testimonial.avatar}
          alt={testimonial.name}
          width={100}
          height={100}
          className="rounded-full object-cover mb-3"
        />
        <h3 className="text-lg font-semibold text-[var(--color-primary)]">{testimonial.name}</h3>
        <p className="text-sm text-gray-600">{testimonial.title}</p>
      </div>

      {/* 💬 Partie droite */}
      <div className="md:w-2/3 text-gray-800 text-left relative">
        <Quote className="absolute -top-3 -left-2 w-6 h-6 text-pink-500 opacity-70" />
        <p className="italic leading-relaxed pl-6">“{testimonial.text}”</p>
      </div>
    </div>
  );
}
