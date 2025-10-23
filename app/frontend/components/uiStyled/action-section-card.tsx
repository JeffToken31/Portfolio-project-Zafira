'use client';

import React from 'react';
import Image from 'next/image';
import BlogSectionButton from '../uiStyled/blog-section-button'; // on peut réutiliser le bouton

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
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all">
      <Image
        src={image}
        alt={title}
        width={400}
        height={250}
        className="w-full h-56 object-cover"
        unoptimized
      />
      <div className="p-6 text-left">
        <h3 className="text-xl font-semibold text-text mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <BlogSectionButton href={link}>Voir l’action</BlogSectionButton>
      </div>
    </div>
  );
}
