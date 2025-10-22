'use client';

import { Mail, Phone, MapPin, Calendar, Edit3 } from 'lucide-react';

export default function ProfilBeneficiaire() {
  // 🔹 Exemple de données mockées
  const user = {
    nom: 'Marie Dupont',
    email: 'marie.dupont@example.com',
    telephone: '+33 6 12 34 56 78',
    localisation: 'Bordeaux, France',
    dateCreation: '12 mars 2024',
  };

  return (
    <section className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6 text-center">
        Mon profil
      </h2>

      {/* Carte d'informations personnelles */}
      <div className="bg-[var(--color-bg-alt)] rounded-xl p-6 shadow-sm mb-8">
        <div className="flex flex-col gap-5 text-gray-800">
          {/* Nom */}
          <div className="flex items-center gap-3">
            <Edit3 className="w-5 h-5 text-[var(--color-primary)]" />
            <span className="font-semibold text-lg">{user.nom}</span>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-[var(--color-primary)]" />
            <span>{user.email}</span>
          </div>

          {/* Téléphone */}
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-[var(--color-primary)]" />
            <span>{user.telephone}</span>
          </div>

          {/* Localisation */}
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-[var(--color-primary)]" />
            <span>{user.localisation}</span>
          </div>

          {/* Date d’inscription */}
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-[var(--color-primary)]" />
            <span>Membre depuis le {user.dateCreation}</span>
          </div>
        </div>
      </div>

      {/* Bouton Modifier */}
      <div className="flex justify-center">
        <button
          className="flex items-center gap-2 bg-[var(--color-primary)] text-black px-6 py-3 rounded-lg shadow hover:bg-[var(--color-primary-dark)] transition"
          onClick={() => alert('Redirection vers la page de modification')}
        >
          <Edit3 className="w-5 h-5" />
          <span>Modifier mes informations</span>
        </button>
      </div>
    </section>
  );
}
