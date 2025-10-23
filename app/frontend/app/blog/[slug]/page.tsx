// app/blog/[slug]/page.tsx
import { getBlogBySlug } from '@/lib/api/blog';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface BlogSlugPageProps {
  params: { slug: string };
}

export default async function BlogSlugPage(props: BlogSlugPageProps) {
  // ✅ Next.js 15 : await params
  const { slug } = await props.params;

  let blog;
try {
    blog = await getBlogBySlug(slug, true);
    console.log('getBlogBySlug result:', blog);
} catch (error: unknown) {
  const message = error instanceof Error ? error.message : 'Erreur inconnue';
  console.error('❌ Erreur récupération blog :', message);
  return (
    <main className="max-w-4xl mx-auto py-16 px-4 text-center sm:px-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6">
        Erreur lors du chargement de l’article
      </h1>
      <p className="text-gray-700">{message}</p>
    </main>
  );
}

  if (!blog) return notFound(); // si article inexistant

  const isVideo = blog.mediaType === 'VIDEO';
  const mediaUrl = blog.mediaUrl || blog.coverImageUrl;

  return (
    <main className="max-w-5xl mx-auto py-10 px-4 sm:px-8">
      {/* Article */}
      <article className="space-y-10">
        {/* Header : titre + date */}
        <header className="text-center mb-6 sm:mb-10">
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-2 text-gray-900 leading-tight">
            {blog.title}
          </h1>
          <p className="text-gray-500 italic text-sm sm:text-base">
            {blog.publishedAt
              ? `Publié le ${new Date(blog.publishedAt).toLocaleDateString(
                  'fr-FR',
                  {day: 'numeric', month: 'long', year: 'numeric'}
                )}`
              : 'Brouillon'}
          </p>
        </header>

        {/* Média : image ou vidéo */}
        {mediaUrl && (
          <div className="relative rounded-xl overflow-hidden shadow-md mb-6 sm:mb-10">
            {isVideo ? (
              <video
                src={mediaUrl as string}
                controls
                playsInline
                className="w-full max-h-[400px] sm:max-h-[600px] object-cover rounded-lg"
              />
            ) : (
              <Image
                src={mediaUrl as string}
                alt={blog.title}
                width={1200} // largeur max estimée
                height={600} // hauteur max estimée
                className="w-full max-h-[400px] sm:max-h-[600px] object-cover rounded-lg"
                priority={false} // lazy loading
              />
            )}
          </div>
        )}

        {/* Contenu HTML avec prose Tailwind */}
        <section
          className="prose prose-sm sm:prose-lg max-w-none text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{__html: blog.content}}
        />
      </article>
    </main>
  );
}
