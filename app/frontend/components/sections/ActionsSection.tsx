'use client';

import ActionSectionButton from '../uiStyled/action-section-button';
import ActionSectionCarousel from '../uiStyled/action-section-carousel';

export default function ActionSection() {
  return (
    <section className="bg-bg-alt text-center">
      {/* Carrousel des actions */}
      <ActionSectionCarousel limit={5} />

      {/* Bouton vers toutes les actions */}
      <div className="p-2">
        <ActionSectionButton href="/actions">
          Toutes nos prestations
        </ActionSectionButton>
      </div>
    </section>
  );
}
