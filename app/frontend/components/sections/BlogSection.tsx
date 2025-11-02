'use client';

import React, { useEffect, useState } from 'react';
import BlogSectionCard from '../uiStyled/blog-section-card';
import { Button } from '@/components/uiStyled/button';
import { getPublishedBlogs, BlogDto } from '@/lib/api/blog';

export default function BlogSection() {
  const [blogs, setBlogs] = useState<BlogDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/blogs?limit=3`
        );
        if (!res.ok) throw new Error('Erreur de récupération des articles');
        const data = await getPublishedBlogs(false);
        setBlogs(data.slice(0, 3));
      } catch (err) {
        console.error('Erreur de chargement des blogs :', err);
        setError('Impossible de charger les articles.');
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <section className="py-16 bg-[var(--color-background-alt)] text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-4 text-text">Nos articles</h2>
        <p className="text-lg text-gray-600 mb-12">
          Explorez nos actions, nos valeurs et les histoires inspirantes que
          nous partageons.
        </p>

        {/* Loader */}
        {loading && <p className="text-gray-500">Chargement des articles...</p>}

        {/* Erreur */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Blog list */}
        {!loading && !error && (
          <>
            {blogs.length > 0 ? (
              <div
                className="
                  flex flex-wrap justify-center gap-8
                  max-w-7xl mx-auto
                "
              >
                {blogs.map((blog) => (
                  <BlogSectionCard
                    key={blog.id}
                    title={blog.title}
                    excerpt={blog.excerpt ?? ''}
                    image={
                      blog.coverImageUrl ||
                      blog.mediaUrl ||
                      '/images/placeholder.jpg'
                    }
                    link={`/blog/${blog.slug}`}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Aucun article pour le moment.</p>
            )}
          </>
        )}

        {/* Bouton "Tous les articles" */}
        <div className="mt-12">
          <Button href="/blog" variant="connect">
            Tous les articles
          </Button>
        </div>
      </div>
    </section>
  );
}
