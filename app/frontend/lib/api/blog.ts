// lib/api/blog.ts
export interface CreateBlogDto {
  title: string;
  content: string;
  coverImageUrl?: string;
  mediaUrl?: string;
  mediaType?: 'IMAGE' | 'VIDEO';
  excerpt?: string; // optionnel, généré côté backend si tu veux
  published?: boolean; // optionnel, par défaut false
}

export async function createBlog(blog: CreateBlogDto) {
  const res = await fetch('http://localhost:3001/blogs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // pour inclure le cookie auth_token
    body: JSON.stringify(blog),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Erreur lors de la création du blog');
  }

  return res.json();
}
