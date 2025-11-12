import {getBlogBySlug} from '@/lib/api/blog';
import {notFound} from 'next/navigation';
import Image from 'next/image';

interface BlogSlugPageProps {
  params: Promise<{slug: string}>;
}

export async function generateMetadata({params}: BlogSlugPageProps) {
  const {slug} = await params;

  try {
    const blog = await getBlogBySlug(slug, true);

    if (!blog) {
      return {
        title: 'Article introuvable | Zafira Solidaire',
        description: 'Cet article n’existe pas ou a été supprimé.',
      };
    }

    return {
      title: `${blog.title} | Zafira Solidaire`,
      description:
        blog.content?.slice(0, 160) || 'Découvrez un nouvel article inspirant.',
      openGraph: {
        title: blog.title,
        description: blog.content?.slice(0, 200) || '',
        images: blog.coverImageUrl
          ? [
              {
                url: blog.coverImageUrl,
                width: 1200,
                height: 630,
                alt: blog.title,
              },
            ]
          : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: blog.title,
        description: blog.content?.slice(0, 200) || '',
        images: blog.coverImageUrl ? [blog.coverImageUrl] : [],
      },
    };
  } catch {
    return {
      title: 'Erreur | Zafira Solidaire',
      description: 'Impossible de charger les métadonnées de cet article.',
    };
  }
}

export default async function BlogSlugPage({params}: BlogSlugPageProps) {
  const {slug} = await params;

  let blog;
  try {
    blog = await getBlogBySlug(slug, true);
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

  if (!blog) return notFound();

  const isVideo = blog.mediaType === 'VIDEO';
  const mediaUrl = blog.mediaUrl || blog.coverImageUrl;

  return (
    <main className="max-w-5xl mx-auto py-10 px-4 sm:px-8">
      <article className="space-y-10">
        {/* Header */}
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
              : ''}
          </p>
        </header>

        {/* Média */}
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
                width={1200}
                height={600}
                className="w-full max-h-[400px] sm:max-h-[600px] object-cover rounded-lg"
                priority={false}
              />
            )}
          </div>
        )}

        <section
          className="prose prose-sm sm:prose-lg max-w-none text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{__html: blog.content}}
        />
      </article>
    </main>
  );
}
