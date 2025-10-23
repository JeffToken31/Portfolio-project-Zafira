'use client';

import ActionSectionCarousel from '../uiStyled/action-section-carousel';
import ActionSectionButton from '../uiStyled/action-section-button';

export default function ActionSection() {
  return (
    <section className="bg-bg-alt text-center">
      <ActionSectionCarousel />

      <div className='pb-4'>
        <ActionSectionButton href="/#actions">
          Toutes nos actions
        </ActionSectionButton>
      </div>
    </section>
  );
}
