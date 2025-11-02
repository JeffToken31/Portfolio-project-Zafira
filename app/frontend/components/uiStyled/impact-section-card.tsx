'use client';

import React from 'react';
import Image from 'next/image';

interface ImpactCardProps {
  title: string;
  excerpt: string;
  image: string;
}

export default function ImpactSectionCard({ title, excerpt, image }: ImpactCardProps) {
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
    </div>
  );
}
