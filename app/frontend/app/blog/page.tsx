'use client';

import {useEffect, useState} from 'react';
import BlogSectionCard from '@/components/uiStyled/blog-section-card';
import {getPublishedBlogs, BlogDto} from '@/lib/api/blog';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        const freshBlogs = await getPublishedBlogs(false);
        setBlogs(freshBlogs); // fetch all blogs
      } catch (err) {
        console.error('❌ Error fetching blogs:', err);
        setError('Unable to load blog posts.');
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <main className="bg-bg min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading blog posts...</p>
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
          <p className="text-gray-500 text-center">No blog posts found.</p>
        ) : (
          // Use CSS grid instead of flex for responsive layout
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogSectionCard
                key={blog.id}
                title={blog.title}
                excerpt={blog.excerpt ?? ''}
                image={blog.coverImageUrl || '/images/placeholder.jpg'}
                link={`/blog/${blog.slug}`}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
