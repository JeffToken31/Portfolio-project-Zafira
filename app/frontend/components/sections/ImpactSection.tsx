'use client';

import React from 'react';
import {motion} from 'framer-motion';
import {Users, Weight, Presentation} from 'lucide-react';
import {Button} from '../uiStyled/button';
import ImpactSectionCard from '../uiStyled/impact-section-card';
import {useManualStats} from '@/lib/hooks/useManualStats';

const ImpactSection: React.FC = () => {
  const {stats, loading, error} = useManualStats();

  const beneficiaries =
    stats.find((s) => s.type === 'BENEFICIARIES')?.totalQuantity || 0;
  const clothesKg =
    stats.find((s) => s.type === 'CLOTHES_KG')?.totalQuantity || 0;
  const workshops =
    stats.find((s) => s.type === 'WORKSHOPS')?.totalQuantity || 0;

  const impactData = [
    {
      icon: <Users />,
      number: beneficiaries,
      title: 'Bénéficiaires accompagnés',
      description: 'Personnes aidées cette année.',
      color: 'text-blue-500',
      excerpt:
        'Accompagnement individuel et collectif pour mieux vivre au quotidien.',
      image: '/bénéficiaires accompagnés.jpg',
      link: '/impact/beneficiaires',
    },
    {
      icon: <Weight />,
      number: `${clothesKg} kilos`,
      title: 'Vêtements collectés',
      description: 'Collecte solidaire en 2025.',
      color: 'text-green-500',
      excerpt:
        'Collecte, tri et redistribution de vêtements pour les familles dans le besoin.',
      image: '/vetements collectés.jpg',
      link: '/impact/collecte-vetements',
    },
    {
      icon: <Presentation />,
      number: workshops,
      title: 'Ateliers organisés',
      description: 'Sessions image de soi.',
      color: 'text-yellow-500',
      excerpt:
        "Ateliers pratiques et théoriques pour renforcer l'estime de soi.",
      image: '/ateliers organisés.jpg',
      link: '/impact/ateliers',
    },
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Notre Impact</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Chaque chiffre raconte une histoire de transformation et d'espoir.
        </p>

        {/* Affichage en attente */}
        {loading && <p className="text-gray-500 mt-4">Chargement...</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* 📊 Mini-Stats Impact */}
        <div className="grid md:grid-cols-3 gap-8 text-center my-8 justify-center">
          <motion.div
            whileInView={{opacity: 1, y: 0}}
            initial={{opacity: 0, y: 30}}
            transition={{duration: 0.5}}
          >
            <Users className="mx-auto text-pink-500 w-10 h-10 mb-2" />
            <p className="text-2xl font-bold">{beneficiaries}</p>
            <p className="text-sm">Bénéficiaires accompagnés</p>
          </motion.div>

          <motion.div
            whileInView={{opacity: 1, y: 0}}
            initial={{opacity: 0, y: 30}}
            transition={{duration: 0.6}}
          >
            <Weight className="mx-auto text-blue-500 w-10 h-10 mb-2" />
            <p className="text-2xl font-bold">{clothesKg} kg</p>
            <p className="text-sm">Vêtements collectés</p>
          </motion.div>

          <motion.div
            whileInView={{opacity: 1, y: 0}}
            initial={{opacity: 0, y: 30}}
            transition={{duration: 0.7}}
          >
            <Presentation className="mx-auto text-yellow-500 w-10 h-10 mb-2" />
            <p className="text-2xl font-bold">{workshops}</p>
            <p className="text-sm">Ateliers organisés</p>
          </motion.div>
        </div>

        {/* Large cards */}
        <div className="grid md:grid-cols-3 gap-8 px-4 md:px-0 mt-12">
          {impactData.map((item, index) => (
            <ImpactSectionCard key={index} {...item} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="fake" size="lg">
            Ensemble, redonnons l'espoir d'y arriver.
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
