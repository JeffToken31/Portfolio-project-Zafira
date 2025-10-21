// app/dashboard/beneficiaire/edit/page.tsx
'use client';

import { useState } from 'react';

export default function EditBeneficiairePage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/beneficiaires', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-[var(--color-primary)]">
        Modifier mes informations
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nouvel email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[var(--color-primary)] text-white py-2 rounded-lg hover:bg-[var(--color-primary-dark)] transition"
        >
          Enregistrer
        </button>

        {message && (
          <p className="text-center text-sm text-gray-600 mt-2">{message}</p>
        )}
      </form>
    </div>
  );
}
