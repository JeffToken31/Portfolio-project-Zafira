'use client';

import React from 'react';
import AdminBlogForm from '@/components/forms/AdminBlogForm';

export default function AdminBlogPage() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-50 py-10 px-6">
      <section className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          📝 Créer un nouvel article de blog
        </h1>

        <AdminBlogForm />
      </section>
    </main>
  );
}
