// app/page.tsx
import HeroSection from '@/components/sections/HeroSection';
import ImpactSection from '@/components/sections/ImpactSection';
import BlogSection from '@/components/sections/BlogSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ImpactSection />
      <BlogSection />
      {/* Tu continues avec les autres sections */}
    </>
  );
}
