'use client';

import * as React from 'react';
import {Button} from '@/components/uiStyled/button';
import {uploadFile} from '@/lib/api/upload';
import {patchBlog} from '@/lib/api/blog';
import type {BlogDto} from '@/lib/api/blog';
import {cn} from '@/lib/utils/cn';

interface AdminBlogEditFormProps {
  blog: BlogDto;
  onUpdated?: () => void;
}

export default function AdminBlogEditForm({
  blog,
  onUpdated,
}: AdminBlogEditFormProps) {
  const [title, setTitle] = React.useState(blog.title);
  const [content, setContent] = React.useState(blog.content);
  const [published, setPublished] = React.useState(blog.published);

  // fichiers à uploader
  const [file, setFile] = React.useState<File | null>(null);
  const [coverFile, setCoverFile] = React.useState<File | null>(null);

  // preview URLs
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = React.useState<string | null>(
    null
  );

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const API_BASE_URL = 'http://localhost:3001';

  React.useEffect(() => {
    // affichage du média actuel
    if (blog.mediaUrl) setPreviewUrl(blog.mediaUrl);
    if (blog.coverImageUrl) setCoverPreviewUrl(blog.coverImageUrl);

    return () => {
      if (previewUrl && previewUrl.startsWith('blob:'))
        URL.revokeObjectURL(previewUrl);
      if (coverPreviewUrl && coverPreviewUrl.startsWith('blob:'))
        URL.revokeObjectURL(coverPreviewUrl);
    };
  }, [blog]);

  const isVideo = (f: File | null, existingUrl?: string) => {
    if (f) return f.type.startsWith('video');
    return existingUrl?.match(/\.(mp4|mov|avi|mkv)$/i) ? true : false;
  };

  const setFileWithPreview = (file: File | null) => {
    if (previewUrl?.startsWith('blob:')) URL.revokeObjectURL(previewUrl);
    setFile(file);
    if (file) setPreviewUrl(URL.createObjectURL(file));
  };

  const setCoverWithPreview = (file: File | null) => {
    if (coverPreviewUrl?.startsWith('blob:'))
      URL.revokeObjectURL(coverPreviewUrl);
    setCoverFile(file);
    if (file) setCoverPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      let mediaUrl = blog.mediaUrl;
      let mediaType = blog.mediaType;
      let coverImageUrl = blog.coverImageUrl;

      if (file) {
        const uploaded = await uploadFile(file);
        mediaUrl = uploaded.url.startsWith('http')
          ? uploaded.url
          : `${API_BASE_URL}${uploaded.url}`;
        mediaType = uploaded.mimeType.startsWith('video') ? 'VIDEO' : 'IMAGE';
      }

      if (coverFile) {
        const uploadedCover = await uploadFile(coverFile);
        coverImageUrl = uploadedCover.url.startsWith('http')
          ? uploadedCover.url
          : `${API_BASE_URL}${uploadedCover.url}`;
      } else if (mediaType === 'IMAGE') {
        coverImageUrl = mediaUrl;
      }

      await patchBlog(blog.id, {
        title,
        content,
        published,
        mediaUrl,
        mediaType,
        coverImageUrl,
      });

      setSuccess('Article mis à jour avec succès');
      if (onUpdated) onUpdated();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold text-gray-800">Modifier le blog</h2>

      {/* titre */}
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

      {/* contenu */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-text">Contenu</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className={cn(
            'mt-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary'
          )}
          required
        />
      </div>

      {/* média principal */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-text">Média principal</label>
        <label className="mt-1 cursor-pointer inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition w-fit">
          {file ? 'Changer le média' : 'Choisir un média'}
          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setFileWithPreview(e.target.files?.[0] ?? null)}
            className="hidden"
          />
        </label>

        {previewUrl && (
          <div className="mt-2 flex">
            {isVideo(file, previewUrl) ? (
              <video
                src={previewUrl}
                className="max-h-32 w-auto rounded-md object-contain shadow-sm border"
                muted
                playsInline
                controls
              />
            ) : (
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-32 w-auto rounded-md object-contain shadow-sm border"
              />
            )}
          </div>
        )}
      </div>

      {/* image de couverture optionnelle */}
      {isVideo(file, previewUrl) && (
        <div className="flex flex-col">
          <label className="text-sm font-medium text-text">
            Image de couverture (optionnelle)
          </label>
          <label className="mt-1 cursor-pointer inline-flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondary-dark transition w-fit">
            {coverFile ? 'Changer la couverture' : 'Choisir une image'}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverWithPreview(e.target.files?.[0] ?? null)}
              className="hidden"
            />
          </label>
          {coverPreviewUrl && (
            <img
              src={coverPreviewUrl}
              alt="Cover preview"
              className="mt-2 max-h-32 w-auto rounded-md object-contain shadow-sm border"
            />
          )}
        </div>
      )}

      {/* publier ? */}
      <div className="flex items-center gap-2 mt-2">
        <input
          id="published"
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
        />
        <label htmlFor="published" className="text-sm font-medium text-text">
          Publier
        </label>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}

      <Button type="submit" variant="default" disabled={loading}>
        {loading ? 'Mise à jour...' : 'Mettre à jour'}
      </Button>
    </form>
  );
}
