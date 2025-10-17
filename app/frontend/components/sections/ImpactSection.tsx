'use client';

import React from 'react';
import ImpactSectionCard from '../uiStyled/impact-section-card';
import ImpactSectionButton from '../uiStyled/impact-section-button';
import { FaUsers } from 'react-icons/fa';
import { Shirt } from 'lucide-react';
import { BookOpenText } from 'lucide-react';

const ImpactSection: React.FC = () => {
  const impactData = [
    {
      icon: <FaUsers />,
      number: 150,
      title: 'Bénéficiaires accompagnés',
      description: 'Personnes aidées cette année.',
      color: 'text-blue-500',
      excerpt: "Accompagnement individuel et collectif pour mieux vivre au quotidien.",
      image: '/images/beneficiaires.jpg',
      link: '/impact/beneficiaires',
    },
    {
      icon: <Shirt />,
      number: '500 kilos',
      title: 'Vêtements collectés',
      description: 'Collecte solidaire en 2025.',
      color: 'text-green-500',
      excerpt: 'Collecte, tri et redistribution de vêtements pour les familles dans le besoin.',
      image: '/images/collecte-vetements.jpg',
      link: '/impact/collecte-vetements',
    },
    {
      icon: <BookOpenText />,
      number: 40,
      title: 'Ateliers organisés',
      description: 'Sessions image de soi.',
      color: 'text-yellow-500',
      excerpt: "Ateliers pratiques et théoriques pour renforcer l'estime de soi.",
      image: '/images/ateliers.jpg',
      link: '/impact/ateliers',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Notre Impact</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          CHaque chiffre raconte une histoire de transformation et d'espoir.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 px-4 md:px-0 mb-12">
        {impactData.map((item, index) => (
          <ImpactSectionCard key={index} {...item} />
        ))}
      </div>

      <div className="text-center">
        <ImpactSectionButton>Ensemble, redonnons l'espoir d'y arriver.</ImpactSectionButton>
      </div>
    </section>
  );
};

export default ImpactSection;
