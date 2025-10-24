'use client';

import { motion } from 'framer-motion';
import { Handshake, Calculator, Medal, Target } from 'lucide-react';
import PartnersCard from '@/components/uiStyled/partners-section-card';
import PartnersButton from '@/components/uiStyled/partners-section-button';

export default function PartnersSection() {
  return (
    <section
      id="partners"
      className="py-20 px-6 md:px-16 bg-[var(--color-bg-alt)] text-text"
    >
      {/* 🏷️ Titre principal */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-text">
        Ensemble, nous allons plus loin
      </h2>

      {/* 💬 Sous-titre */}
      <p className="text-center text-black mb-12">
        Découvrez le réseau de partenaires qui nous accompagne dans notre mission.
      </p>

      {/* 📊 Statistiques */}
      <div className="grid md:grid-cols-3 gap-8 text-center mb-16">
        <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }} transition={{ duration: 0.5 }}>
          <Handshake className="mx-auto text-blue-500 w-10 h-10 mb-2" />
          <p className="text-2xl font-bold">+25</p>
          <p className="text-sm">Partenaires actifs</p>
        </motion.div>

        <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }} transition={{ duration: 0.6 }}>
          <Calculator className="mx-auto text-yellow-500 w-10 h-10 mb-2" />
          <p className="text-2xl font-bold">+100</p>
          <p className="text-sm">Entreprises sensibilisées</p>
        </motion.div>

        <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }} transition={{ duration: 0.7 }}>
          <Medal className="mx-auto text-green-500 w-10 h-10 mb-2" />
          <p className="text-2xl font-bold">2020</p>
          <p className="text-sm">Premier partenariat</p>
        </motion.div>
      </div>

      {/* 🔹 Sous-titre partenaires */}
      <h3 className="text-2xl font-bold text-center text-text mb-10">
        Nos partenaires principaux
      </h3>

      {/* 🧩 Cartes partenaires */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <PartnersCard
          logo="/Logo FranceTravail.png"
          name="France Travail"
          type="Institution publique"
          typeColor="text-blue-600"
          description="Partenaire principal pour l’orientation des demandeurs d’emploi."
        />
        <PartnersCard
          logo="/Logo MissionsLocales.png"
          name="Missions Locales"
          type="Insertion jeunesse"
          typeColor="text-orange-500"
          description="Accompagnement des 16–25 ans en insertion."
        />
        <PartnersCard
          logo="/Logo CCAS Aulnay.png"
          name="CCAS"
          type="Sociale"
          typeColor="text-pink-600"
          description="Centre communal d’action sociale de la ville."
        />
      </div>

      {/* 🎯 Carte finale rose */}
      <div className="bg-pink-500 text-white rounded-xl p-10 text-center max-w-3xl mx-auto shadow-lg">
        <Target className="w-10 h-10 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-4">
          Devenez partenaire de Zafira Solidaire
        </h3>
        <p className="mb-6">
          Rejoignez notre réseau de partenaires engagés et participez concrètement
          à la réinsertion professionnelle. Ensemble, construisons un impact durable.
        </p>
        <PartnersButton href="/partenaires" variant="light">
          Devenez partenaire
        </PartnersButton>
      </div>
    </section>
  );
}
