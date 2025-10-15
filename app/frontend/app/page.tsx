// app/page.tsx
'use client';

import HeroSection from '@/components/sections/HeroSection';
import ActionSection from '@/components/sections/ActionsSection';
import BlogSection from '@/components/sections/BlogSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ActionSection />
      <BlogSection />
    </>
  );
}
