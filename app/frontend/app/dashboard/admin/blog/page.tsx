'use client';

import React, {useEffect, useState} from 'react';
import AdminBlogForm from '@/components/forms/AdminBlogForm';
import {getBlogs, patchBlog, deleteBlog, BlogDto} from '@/lib/api/blog';
import {Button} from '@/components/uiStyled/button';
import AdminBlogEditModal from '@/components/dashboard/adminBlogEditModal';
import Image from 'next/image';
import NavDashboard from '@/components/uiStyled/nav-dashboard';


export default function AdminBlogDashboardPage() {
  const [blogs, setBlogs] = useState<BlogDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshFlag, setRefreshFlag] = useState(0);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogDto | null>(null);

  useEffect(() => {
    let active = true;
    async function fetchBlogs() {
      setLoading(true);
      setError(null);
      try {
        const data = await getBlogs();
        if (active) setBlogs(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError('Erreur inconnue');
      } finally {
        if (active) setLoading(false);
      }
    }
    fetchBlogs();
    return () => {
      active = false;
    };
  }, [refreshFlag]);

  const refresh = () => setRefreshFlag((x) => x + 1);

  const handleTogglePublish = async (b: BlogDto) => {
    try {
      await patchBlog(b.id, {published: !b.published});
      refresh();
    } catch (err: unknown) {
      alert(
        err instanceof Error
          ? err.message
          : 'Erreur lors du changement de statut'
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cet article ?')) return;
    try {
      await deleteBlog(id);
      refresh();
    } catch (err: unknown) {
      alert(
        err instanceof Error ? err.message : 'Erreur lors de la suppression'
      );
    }
  };

  const handleEdit = (blog: BlogDto) => {
    setSelectedBlog(blog);
    setIsEditOpen(true);
  };

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-2xl text-center font-bold mb-4 text-gray-800">
          Gestion du Blog
        </h1>
        <NavDashboard />
        {/* Create section */}
        <section className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <h2 className="text-lg font-semibold">Créer un nouvel article</h2>
          <AdminBlogForm onCreated={refresh} />
        </section>

        {/* List object */}
        <section className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <h2 className="text-lg font-semibold">Articles existants</h2>

          {loading && <p>Chargement...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && blogs.length === 0 && (
            <p>Aucun article pour le moment.</p>
          )}

          <div className="space-y-4">
            {blogs.map((b) => (
              <div
                key={b.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 border border-gray-200 rounded-lg p-4"
              >
                <div className="flex gap-4 items-start">
                  {b.coverImageUrl ? (
                    <Image
                      src={b.coverImageUrl}
                      alt={b.title}
                      width={200}
                      height={200}
                      unoptimized
                      className="w-28 h-28 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-28 h-28 bg-gray-100 flex items-center justify-center rounded-md text-gray-400 text-sm">
                      Pas de media
                    </div>
                  )}
                  <div className="max-w-lg">
                    <h3 className="font-semibold text-gray-900">{b.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {b.content}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {b.published
                        ? `Publié ${
                            b.publishedAt
                              ? 'le ' +
                                new Date(b.publishedAt).toLocaleDateString(
                                  'fr-FR'
                                )
                              : ''
                          }`
                        : 'Brouillon'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  <Button
                    type="button"
                    variant="jaune"
                    size="sm"
                    onClick={() => handleTogglePublish(b)}
                  >
                    {b.published ? 'Dépublier' : 'Publier'}
                  </Button>

                  <Button
                    type="button"
                    variant="bleu"
                    size="sm"
                    onClick={() => handleEdit(b)}
                  >
                    Modifier
                  </Button>

                  <Button
                    type="button"
                    variant="rose"
                    size="sm"
                    onClick={() => handleDelete(b.id)}
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Modale update */}
      <AdminBlogEditModal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        blog={selectedBlog}
        onUpdated={() => {
          setIsEditOpen(false);
          refresh();
        }}
      />
    </main>
  );
}
