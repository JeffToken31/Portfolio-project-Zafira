export interface CreateBlogDto {
  title: string;
  content: string;
  coverImageUrl?: string;
  mediaUrl?: string;
  mediaType?: 'IMAGE' | 'VIDEO';
  excerpt?: string;
  published?: boolean;
}

export interface BlogDto {
  id: string;
  title: string;
  slug: string;
  content: string;
  coverImageUrl?: string | null;
  mediaUrl?: string | null;
  mediaType?: 'IMAGE' | 'VIDEO' | null;
  excerpt?: string | null;
  published: boolean;
  publishedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

// ----------------------------
// URL API management
// ----------------------------

function getApiBase(ssr: boolean) {
  return ssr
    ? process.env.API_BASE_SSR
    : process.env.NEXT_PUBLIC_API_BASE;
}

// ----------------------------
// Create Blog
// ----------------------------
export async function createBlog(blog: CreateBlogDto, ssr = false) {
  const res = await fetch(`${getApiBase(ssr)}/blogs`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    // On SSR side, cookie can't kepped
    credentials: ssr ? 'omit' : 'include',
    body: JSON.stringify(blog),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Erreur lors de la création du blog');
  }
  return res.json();
}

// ----------------------------
// GET All Blogs
// ----------------------------
export async function getBlogs(ssr = false): Promise<BlogDto[]> {
  const res = await fetch(`${getApiBase(ssr)}/blogs`, {
    method: 'GET',
    cache: ssr ? 'no-store' : 'default',
    credentials: ssr ? 'omit' : 'include',
  });

  if (!res.ok) throw new Error('Erreur lors de la récupération des blogs');
  return res.json();
}

// ----------------------------
// GET Blog by ID
// ----------------------------
export async function getBlogById(id: string, ssr = false): Promise<BlogDto> {
  const res = await fetch(`${getApiBase(ssr)}/blogs/${id}`, {
    method: 'GET',
    credentials: ssr ? 'omit' : 'include',
  });

  if (!res.ok) throw new Error('Blog non trouvé');
  return res.json();
}

// ----------------------------
// GET Blog by Slug
// ----------------------------
export async function getBlogBySlug(
  slug: string,
  ssr = true
): Promise<BlogDto> {
  const res = await fetch(`${getApiBase(ssr)}/blogs/slug/${slug}`, {
    method: 'GET',
    credentials: ssr ? 'omit' : 'include',
  });

  if (!res.ok) throw new Error('Blog non trouvé');
  return res.json();
}

// ----------------------------
// GET Published Blogs (for public site)
// ----------------------------
export async function getPublishedBlogs(ssr = false): Promise<BlogDto[]> {
  const res = await fetch(`${getApiBase(ssr)}/blogs/public`, {
    method: 'GET',
    cache: ssr ? 'no-store' : 'default',
    credentials: ssr ? 'omit' : 'include',
  });

  if (!res.ok) throw new Error('Erreur lors de la récupération des blogs publiés');
  return res.json();
}

// ----------------------------
// PATCH Blog
// ----------------------------
export async function patchBlog(
  id: string,
  dto: Partial<CreateBlogDto>,
  ssr = false
) {
  const res = await fetch(`${getApiBase(ssr)}/blogs/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    credentials: ssr ? 'omit' : 'include',
    body: JSON.stringify(dto),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Erreur lors de la mise à jour du blog');
  }
  return res.json();
}

// ----------------------------
// DELETE Blog
// ----------------------------
export async function deleteBlog(id: string, ssr = false) {
  const res = await fetch(`${getApiBase(ssr)}/blogs/${id}`, {
    method: 'DELETE',
    credentials: ssr ? 'omit' : 'include',
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Erreur lors de la suppression du blog');
  }
  return res.json();
}
