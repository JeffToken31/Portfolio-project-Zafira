'use client';

import React from 'react';
import FAQSectionAccordion from '../uiStyled/faq-section-accordion';
import {Button} from '../uiStyled/button';

export default function FAQSection() {
  const faqItems = [
    {
      question: "Qu'est-ce que Zafira Solidaire ?",
      answer:
        "Zafira Solidaire est une association loi 1901 qui accompagne les personnes en insertion professionnelle à travers la valorisation de l'image de soi.",
    },
    {
      question: "Comment puis-je devenir bénévole ?",
      answer:
        "Vous pouvez rejoindre notre équipe en remplissant le formulaire disponible sur la page « Devenir bénévole ».",
    },
    {
      question: "Où se trouvent vos locaux ?",
      answer:
        "Nos bureaux sont situés au 18 rue Charles Gouppy, 93600 Aulnay-sous-Bois, France.",
    },
    {
      question: "Proposez-vous des ateliers pour les entreprises ?",
      answer:
        "Oui, nous proposons des ateliers de sensibilisation à la confiance en soi et à la réinsertion via l’image destinés aux structures professionnelles.",
    },
  ];

  return (
    <section className="py-16 bg-gray-100 text-center">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl font-bold mb-6 text-text">
          Foire Aux Questions
        </h2>
        <p className="text-gray-600 mb-10">
          Vous trouverez ici les réponses aux questions les plus fréquemment
          posées.
        </p>

        {/* 🧩 Liste des questions en accordéon */}
        <FAQSectionAccordion items={faqItems} />

        {/* 🔘 Bouton "Voir toutes les questions" */}
        <div className="mt-10 flex justify-center">
          <Button href="#faq" variant="connect">
            Voir toutes les questions
          </Button>
        </div>
      </div>
    </section>
  );
}
