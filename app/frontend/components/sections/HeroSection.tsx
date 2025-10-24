'use client';
import { motion } from 'framer-motion';
import { Button } from '../uiStyled/button';

export default function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-bg bg-center overflow-hidden">

      {/* Cercles en filigrane avec blur et animation flottante */}
      <div className="absolute inset-0 z-0">
        {/* Cercle rose */}
        <motion.div
          className="absolute -top-10 -left-10 w-60 h-60 rounded-full bg-pink-500 opacity-30"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-10 -right-0 w-20 h-20 rounded-full bg-pink-300 opacity-30"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Cercle jaune */}
        <motion.div
          className="absolute top-1/4 right-0 w-40 h-40 rounded-full bg-[#fedc27] opacity-30"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Cercle bleu */}
        <motion.div
          className="absolute bottom-10 left-1/4 w-48 h-48 rounded-full bg-blue-500 opacity-30"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-10 right-1/4 w-28 h-28 rounded-full bg-blue-300 opacity-30"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Contenu principal */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="flex flex-col items-center mb-6">
          <img
            src="/logo_zafira_carre__.jpg"
            alt="Logo Zafira"
            className="w-54 sm:w-56 md:w-64 mb-4"
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#FF69B4] text-center">
            Redonner confiance par l’image
          </h1>
        </div>

        <h2 className="text-lg sm:text-xl md:text-2xl text-[#FFD700]/90 mb-8">
          Accompagnement à la réinsertion par l’image de soi
        </h2>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Button variant="heroSection" size="lg" href="#actions">
            Découvrir nos actions
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
