'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import AdminBlogEditForm from '@/components/forms/AdminBlogEditForm';
import type {BlogDto} from '@/lib/api/blog';

interface AdminBlogEditModalProps {
  open: boolean;
  onClose: () => void;
  blog: BlogDto | null;
  onUpdated?: () => void;
}

export default function AdminBlogEditModal({
  open,
  onClose,
  blog,
  onUpdated,
}: AdminBlogEditModalProps) {
  if (!blog) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-white p-6 rounded-2xl shadow-lg">
        <DialogHeader>
          <DialogTitle>Modifier le blog : {blog.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <AdminBlogEditForm blog={blog} onUpdated={onUpdated} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
