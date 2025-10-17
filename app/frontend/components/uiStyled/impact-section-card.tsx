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
      <Image src={image} alt={title} width={400} height={250} className="w-full h-56 object-cover" />
      <div className="p-6 text-left">
        <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        <ImpactSectionButton href={Link}>Lire la suite</ImpactSectionButton>
      </div>
    </div>
  );
}
