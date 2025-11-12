'use client';

import ActionSectionButton from '../uiStyled/action-section-button';
import ActionSectionCarousel from '../uiStyled/action-section-carousel';

export default function ActionSection() {
  return (
    <section className="bg-gray-100 text-center">
      {/* actions carrousel*/}
      <ActionSectionCarousel limit={5} />

      {/* Button */}
      <div className="p-8">
        <ActionSectionButton href="/actions">
          Toutes nos prestations
        </ActionSectionButton>
      </div>
    </section>
  );
}
