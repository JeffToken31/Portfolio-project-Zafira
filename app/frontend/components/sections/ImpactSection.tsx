'use client';

import React from 'react';
import ImpactSectionCard from '../uiStyled/impact-section-card';
import ImpactMiniCard from '../uiStyled/impact-section-minicard';
import { Button } from '../uiStyled/button';
import { FaUsers } from 'react-icons/fa';
import { Users, Shirt, BookOpenText, Weight, Presentation } from 'lucide-react';
import { motion } from 'framer-motion';

const ImpactSection: React.FC = () => {
  const impactData = [
    {
      icon: <Users />,
      number: 150,
      title: 'Bénéficiaires accompagnés',
      description: 'Personnes aidées cette année.',
      color: 'text-blue-500',
      excerpt: "Accompagnement individuel et collectif pour mieux vivre au quotidien.",
      image: '/bénéficiaires accompagnés.jpg',
      link: '/impact/beneficiaires',
    },
    {
      icon: <Weight />,
      number: '500 kilos',
      title: 'Vêtements collectés',
      description: 'Collecte solidaire en 2025.',
      color: 'text-green-500',
      excerpt: 'Collecte, tri et redistribution de vêtements pour les familles dans le besoin.',
      image: '/vetements collectés.jpg',
      link: '/impact/collecte-vetements',
    },
    {
      icon: <Presentation />,
      number: 40,
      title: 'Ateliers organisés',
      description: 'Sessions image de soi.',
      color: 'text-yellow-500',
      excerpt: "Ateliers pratiques et théoriques pour renforcer l'estime de soi.",
      image: '/ateliers organisés.jpg',
      link: '/impact/ateliers',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Notre Impact</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Chaque chiffre raconte une histoire de transformation et d'espoir.
        </p>

        {/* 📊 Mini-Stats Impact */}
        <div className="grid md:grid-cols-3 gap-8 text-center mb-12 justify-center">
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
          >
            <Users className="mx-auto text-pink-500 w-10 h-10 mb-2" />
            <p className="text-2xl font-bold">150</p>
            <p className="text-sm">Bénéficiaires accompagnés</p>
          </motion.div>

          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <Weight className="mx-auto text-blue-500 w-10 h-10 mb-2" />
            <p className="text-2xl font-bold">500 kilos</p>
            <p className="text-sm">Vêtements collectés</p>
          </motion.div>

          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
          >
            <Presentation className="mx-auto text-yellow-500 w-10 h-10 mb-2" />
            <p className="text-2xl font-bold">40</p>
            <p className="text-sm">Ateliers organisés</p>
          </motion.div>
        </div>

        {/* LARGE CARDS */}
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
