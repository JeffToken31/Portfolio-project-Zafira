'use client';

import React from 'react';
import BlogSectionCard from '../uiStyled/blog-section-card';
import BlogSectionButton from '../uiStyled/blog-section-button';

export default function BlogSection() {
  const articles = [
    {
      id: 1,
      title: "Redonner confiance par l'image",
      excerpt: "Découvrez comment l'accompagnement à l'image de soi aide à la réinsertion professionnelle.",
      image: "/images/blog1.jpg",
      link: "#",
    },
    {
      id: 2,
      title: "L'impact de l'image sur l'estime de soi",
      excerpt: "Un témoignage inspirant sur la reconstruction personnelle à travers la photographie.",
      image: "/images/blog2.jpg",
      link: "#",
    },
    {
      id: 3,
      title: "Les ateliers solidaires en action",
      excerpt: "Retour sur nos dernières initiatives avec les bénéficiaires de Zafira Solidaire.",
      image: "/images/blog3.jpg",
      link: "#",
    },
  ];

  return (
    <section className="py-16 bg-[var(--color-background-alt)] text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-4 text-[var(--color-primary)]">
          Nos articles
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Explorez nos actions, nos valeurs et les histoires inspirantes que nous partageons.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <BlogSectionCard key={article.id} {...article} />
          ))}
        </div>

        <div className="mt-12">
          <BlogSectionButton href="/blog">Voir tous les articles</BlogSectionButton>
        </div>
      </div>
    </section>
  );
}
