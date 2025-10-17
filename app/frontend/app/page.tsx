// app/page.tsx
'use client';

import HeroSection from '@/components/sections/HeroSection';
import ActionSection from '@/components/sections/ActionsSection';
import BlogSection from '@/components/sections/BlogSection';
import FAQSection from '@/components/sections/FAQSection';
import ImpactSection from '@/components/sections/ImpactSection';

export default function HomePage() {
  return (
    <main>
      <section id="home">
        <HeroSection />
      </section>

      <section id="actions">
        <ActionSection />
      </section>
      
      <section id="blog">
        <BlogSection />
      </section>
      
      <section id="faq">
        <FAQSection />
      </section>

      <section id="impact">
        <ImpactSection />
      </section>
    </main>
  );
}
