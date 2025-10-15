// components/sections/action-section.tsx
'use client';

import ActionSectionCarousel from '../uiStyled/action-section-carousel';
import ActionSectionButton from '../uiStyled/action-section-button';

export default function ActionSection() {
  return (
    <section className="py-16 bg-[var(--color-bg)] text-center">
      <ActionSectionCarousel />

      <div className="mt-8">
        <ActionSectionButton href="/actions">
          Voir toutes nos actions
        </ActionSectionButton>
      </div>
    </section>
  );
}
