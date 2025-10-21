// app/dashboard/beneficiaire/delete/page.tsx
'use client';

import { useState } from 'react';

export default function DeleteBeneficiairePage() {
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ?')) {
      const res = await fetch('/api/beneficiaires', { method: 'DELETE' });
      const data = await res.json();
      setMessage(data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-2xl shadow text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Supprimer mon compte</h2>
      <p className="text-gray-600 mb-6">
        Cette action est <strong>irréversible</strong>. Toutes vos données seront supprimées.
      </p>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Supprimer définitivement
      </button>

      {message && (
        <p className="mt-4 text-gray-600 text-sm">{message}</p>
      )}
    </div>
  );
}
