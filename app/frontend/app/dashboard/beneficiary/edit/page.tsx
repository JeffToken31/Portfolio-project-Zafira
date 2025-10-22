'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, Save } from 'lucide-react';

export default function EditProfilBeneficiaire() {
  // 🔹 Exemple de données initiales mockées
  const initialUser = {
    firstName: 'Marie',
    lastName: 'Dupont',
    email: 'marie.dupont@example.com',
    dateCreation: '12 mars 2024',
  };

  const [user, setUser] = useState(initialUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici tu pourrais appeler ton API ou le backend pour sauvegarder les modifications
    alert('Profil mis à jour !');
  };

  return (
    <section className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6 text-center">
        Modifier mon profil
      </h2>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {/* Prénom */}
        <div className="flex items-center gap-3">
          <Save className="w-5 h-5 text-[var(--color-primary)]" />
          <input
            type="text"
            name="firstName"
            placeholder="Prénom"
            value={user.firstName}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Nom */}
        <div className="flex items-center gap-3">
          <Save className="w-5 h-5 text-[var(--color-primary)]" />
          <input
            type="text"
            name="lastName"
            placeholder="Nom"
            value={user.lastName}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Email */}
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-[var(--color-primary)]" />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Date d’inscription (lecture seule) */}
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-[var(--color-primary)]" />
          <input
            type="text"
            name="dateCreation"
            value={user.dateCreation}
            readOnly
            className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Bouton sauvegarder */}
        <button
          type="submit"
          className="bg-[var(--color-primary)] text-black py-3 rounded-lg mt-4 hover:bg-[var(--color-primary-dark)] transition"
        >
          Enregistrer les modifications
        </button>
      </form>
    </section>
  );
}
