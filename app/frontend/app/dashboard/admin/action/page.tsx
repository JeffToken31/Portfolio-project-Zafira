'use client';

import React from 'react';
import AdminActionForm from '@/components/forms/AdminActionForm';

export default function AdminActionPage() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-50 py-10 px-6">
      <section className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          📝 Proposer une nouvelle prestation
        </h1>

        <AdminActionForm />
      </section>
    </main>
  );
}
