'use client';

import React from 'react';
import Image from 'next/image';
import ImpactSectionButton from '../uiStyled/impact-section-button';
import Link from 'next/link';

interface ImpactCardProps {
  title: string;
  excerpt: string;
  image: string;
  link: string;
}

export default function ImpactSectionCard({ title, excerpt, image, link }: ImpactCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all">
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[4/3] lg:aspect-[16/9]">
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-t-2xl"
        />
      </div>
      <div className="p-6 text-left">
        <h3 className="text-xl font-semibold text-text mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        <ImpactSectionButton href={link}>Lire la suite</ImpactSectionButton>
      </div>
    </div>
  );
}
