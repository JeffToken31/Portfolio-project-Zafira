'use client';

import React from 'react';
import Image from 'next/image';
import BlogSectionButton from '../uiStyled/blog-section-button';

interface BlogCardProps {
  title: string;
  excerpt: string;
  image: string;
  link: string;
}

export default function BlogSectionCard({
  title,
  excerpt,
  image,
  link,
}: BlogCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col">
      {/* Image */}
      <Image
        src={image}
        alt={title}
        width={400}
        height={250}
        className="w-full h-56 object-contain"
        unoptimized
      />

      <div className="p-6 flex flex-col justify-between flex-1 text-center">
        <div>
          <h3 className="text-xl font-semibold text-text mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{excerpt}</p>
        </div>

        <BlogSectionButton href={link}>Lire la suite</BlogSectionButton>
      </div>
    </div>
  );
}

