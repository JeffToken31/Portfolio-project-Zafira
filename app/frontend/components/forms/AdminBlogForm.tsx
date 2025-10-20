'use client';

import * as React from 'react';
import {Button} from '../uiStyled/button';
import {cn} from '@/lib/utils/cn';
import {uploadFile} from '@/lib/api/upload';
import {createBlog, CreateBlogDto} from '@/lib/api/blog';

export default function AdminBlogForm() {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [file, setFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      let coverImageUrl: string | undefined;
      let mediaUrl: string | undefined;
      let mediaType: 'IMAGE' | 'VIDEO' | undefined;

      // 🔹 Upload du fichier si présent
    if (file) {
      const uploaded = await uploadFile(file);

      const API_BASE_URL = 'http://localhost:3001';

      coverImageUrl = uploaded.url.startsWith('http')
        ? uploaded.url
        : `${API_BASE_URL}${uploaded.url}`;

      mediaUrl = coverImageUrl;

      mediaType = uploaded.mimeType.startsWith('video') ? 'VIDEO' : 'IMAGE';
    }

      // 🔹 Préparation des données du blog
      const blogData: CreateBlogDto = {
        title,
        content,
        coverImageUrl,
        mediaUrl,
        mediaType,
      };

      // 🔹 Création du blog
      await createBlog(blogData);

      setSuccess('Blog créé avec succès !');
      setTitle('');
      setContent('');
      setFile(null);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {/* Title */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-text">Titre</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={cn(
            'mt-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary'
          )}
          required
        />
      </div>

      {/* Content */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-text">Contenu</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={cn(
            'mt-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary'
          )}
          rows={6}
          required
        />
      </div>

      {/* File upload */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-text">Image / Vidéo</label>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
      </div>

      {/* Error / Success */}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}

      {/* Submit */}
      <Button
        type="submit"
        variant="default"
        className="w-full"
        disabled={loading}
      >
        {loading ? 'Création...' : 'Créer le blog'}
      </Button>
    </form>
  );
}
