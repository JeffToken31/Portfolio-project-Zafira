// lib/api/blog.ts

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

const API_BASE = 'http://localhost:3001';

// create
export async function createBlog(blog: CreateBlogDto) {
  const res = await fetch(`${API_BASE}/blogs`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify(blog),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Erreur lors de la création du blog');
  }
  return res.json();
}

// GET all
export async function getBlogs(): Promise<BlogDto[]> {
  const res = await fetch(`${API_BASE}/blogs`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Erreur lors de la récupération des blogs');
  }
  return res.json();
}

// GET by id
export async function getBlogById(id: string): Promise<BlogDto> {
  const res = await fetch(`${API_BASE}/blogs/${id}`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Blog non trouvé');
  return res.json();
}

// PATCH partial update
export async function patchBlog(id: string, dto: Partial<CreateBlogDto>) {
  const res = await fetch(`${API_BASE}/blogs/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify(dto),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Erreur lors de la mise à jour du blog');
  }
  return res.json();
}

// DELETE
export async function deleteBlog(id: string) {
  const res = await fetch(`${API_BASE}/blogs/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Erreur lors de la suppression du blog');
  }
  return res.json();
}
