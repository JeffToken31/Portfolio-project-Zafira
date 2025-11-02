'use client';

import { useEffect, useState } from 'react';
import BlogSectionCard from '@/components/uiStyled/blog-section-card';
import { getPublishedBlogs, BlogDto } from '@/lib/api/blog';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        const freshBlogs = await getPublishedBlogs(false);
        setBlogs(freshBlogs.slice(0, 3)); // max 3 cards
      } catch (err) {
        console.error('❌ Erreur lors de la récupération des blogs :', err);
        setError('Impossible de charger les articles du blog.');
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <main className="bg-bg min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Chargement des articles...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-bg min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </main>
    );
  }

  return (
    <main className="bg-bg">
      <div className="max-w-7xl mx-auto py-16 px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-text">
          Tous les articles du blog
        </h1>

        {blogs.length === 0 ? (
          <p className="text-gray-500 text-center">
            Aucun article trouvé pour le moment.
          </p>
        ) : (
          <div className="flex justify-center gap-8">
            {blogs.map((blog) => (
              <div className="flex-shrink-0">
                <BlogSectionCard
                  key={blog.id}
                  title={blog.title}
                  excerpt={blog.excerpt ?? ''}
                  image={blog.coverImageUrl || '/images/placeholder.jpg'}
                  link={`/blog/${blog.slug}`}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
