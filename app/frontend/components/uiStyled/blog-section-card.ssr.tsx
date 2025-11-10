import React from 'react';
import Image from 'next/image';
import BlogSectionButton from '../uiStyled/blog-section-button.ssr';

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
      {/* Image au-dessus */}
      <div className="w-full h-56 relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-t-2xl"
          unoptimized
        />
      </div>

      {/* Contenu centré */}
      <div className="p-6 text-center flex flex-col">
        <h3 className="text-xl md:text-2xl font-semibold break-words">
          {title}
        </h3>

        <p className="text-gray-600 mb-4 break-words">{excerpt}</p>

        <BlogSectionButton href={link}>
          Lire la suite
        </BlogSectionButton>
      </div>
    </div>
  );
}
