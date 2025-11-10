'use client';

import React from 'react';
import Image from 'next/image';
import BlogSectionButton from '@/components/uiStyled/blog-section-button';

interface ActionCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

export default function ActionSectionCard({
  title,
  description,
  image,
  link,
}: ActionCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col w-[360px] min-h-[520px]">
      {/* Image fixe */}
      <div className="relative w-full h-56">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-t-2xl"
          unoptimized
        />
      </div>

      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-xl font-semibold text-text mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>

        {/* Bouton centré */}
        <div className="flex justify-center mt-4">
          <BlogSectionButton href={link}>
            En savoir plus
          </BlogSectionButton>
        </div>
      </div>
    </div>
  );
}
