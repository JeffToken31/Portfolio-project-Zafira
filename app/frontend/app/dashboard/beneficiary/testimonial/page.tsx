// app/dashboard/beneficiaire/temoignage/page.tsx
'use client';

import { useState } from 'react';

export default function TemoignagePage() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/temoignages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setStatus(data.message);
    if (data.success) setMessage('');
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-[var(--color-primary)]">
        Partager mon témoignage
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder="Écrivez ici votre expérience..."
          className="w-full border rounded-lg p-2"
          required
        />
        <button
          type="submit"
          className="w-full bg-[var(--color-primary)] text-gray py-2 rounded-lg hover:bg-[var(--color-primary-dark)] transition"
        >
          Envoyer
        </button>

        {status && <p className="text-center text-sm text-gray-600 mt-2">{status}</p>}
      </form>
    </div>
  );
}
