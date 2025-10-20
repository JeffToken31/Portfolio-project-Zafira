'use client';

import React, {useEffect, useState} from 'react';
import AdminBlogForm from '@/components/forms/AdminBlogForm'; 
import {getBlogs, patchBlog, deleteBlog, BlogDto} from '@/lib/api/blog';
import {Button} from '@/components/ui/button'; // ou ton Button styled, adapte l'import

export default function AdminBlogDashboardPage() {
  const [blogs, setBlogs] = useState<BlogDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshFlag, setRefreshFlag] = useState(0); // force reload after actions

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await getBlogs();
        if (mounted) setBlogs(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError('Erreur inconnue');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [refreshFlag]);

  const refresh = () => setRefreshFlag((v) => v + 1);

  const handleTogglePublish = async (b: BlogDto) => {
    try {
      await patchBlog(b.id, {published: !b.published});
      refresh();
    } catch (err: unknown) {
      console.error(err);
      alert(
        err instanceof Error ? err.message : 'Erreur lors de la publication'
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Confirmer la suppression de cet article ?')) return;
    try {
      await deleteBlog(id);
      refresh();
    } catch (err: unknown) {
      console.error(err);
      alert(
        err instanceof Error ? err.message : 'Erreur lors de la suppression'
      );
    }
  };

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold">Dashboard Admin — Blogs</h1>

        {/* Formulaire de création (ton composant existant) */}
        <section className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">
            Créer un nouvel article
          </h2>
          <AdminBlogForm />
        </section>

        {/* Liste des blogs */}
        <section className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Articles existants</h2>

          {loading && <p>Chargement...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && blogs.length === 0 && <p>Aucun article</p>}

          <div className="space-y-4">
            {blogs.map((b) => (
              <div
                key={b.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border rounded p-4"
              >
                <div className="flex items-start gap-4">
                  {b.coverImageUrl ? (
                    <img
                      src={b.coverImageUrl}
                      alt={b.title}
                      className="w-24 h-24 object-cover rounded"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gray-100 flex items-center justify-center rounded text-sm text-gray-500">
                      Aucun media
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold">{b.title}</h3>
                    <p
                      className="text-sm text-gray-600 line-clamp-2"
                      style={{maxWidth: 420}}
                    >
                      {b.content}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {b.published ? 'Publié' : 'Brouillon'}
                      {b.publishedAt
                        ? ` • ${new Date(b.publishedAt).toLocaleString()}`
                        : ''}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 items-center">
                  <button
                    className="px-3 py-1 rounded bg-indigo-600 text-white text-sm"
                    onClick={() => handleTogglePublish(b)}
                  >
                    {b.published ? 'Dépublier' : 'Publier'}
                  </button>

                  <button
                    className="px-3 py-1 rounded border text-sm"
                    onClick={() =>
                      alert(
                        'Edition : à implémenter (pré-remplir le formulaire)'
                      )
                    }
                  >
                    Modifier
                  </button>

                  <button
                    className="px-3 py-1 rounded bg-red-600 text-white text-sm"
                    onClick={() => handleDelete(b.id)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
