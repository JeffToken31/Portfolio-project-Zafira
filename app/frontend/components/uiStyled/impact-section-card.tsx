'use client';

import React from 'react';
import Image from 'next/image';

interface ImpactCardProps {
  title: string;
  image: string;
}

export default function ImpactSectionCard({title, image}: ImpactCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all">
      <div className="relative w-full aspect-[4/3] hidden lg:block">
        <Image
          src={image}
          alt={title}
          fill
          style={{objectFit: 'cover'}}
          className="rounded-t-2xl"
        />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
    </div>
  );
}
