'use client';

import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export default function ScrollToHomeButton() {
  const router = useRouter();
  const pathname = usePathname();

  const goToHome = () => {
    if (pathname === '/') {
      // Déjà sur la home → scroll en haut
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Naviguer vers la home avec scroll automatique
      router.push('/', { scroll: true });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
      {/* Halo lumineux animé */}
      <motion.div
        className="absolute w-16 h-16 rounded-full bg-[#38b6ff] opacity-40 blur-md"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
        }}
      />

      {/* Bouton principal */}
      <motion.button
        onClick={goToHome}
        aria-label="Revenir à l'accueil"
        className="relative p-4 rounded-full bg-[#38b6ff] text-white shadow-lg hover:shadow-2xl transition-all duration-300"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
      >
        <Home className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
