'use client';
import { motion } from 'framer-motion';
import { Button } from '../uiStyled/button';

export default function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-cover bg-center">
      <div className="absolute inset-0 bg-black/30"></div>

      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8"
        initial={{opacity: 0, y: 60}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.8, ease: 'easeOut'}}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#FF69B4] mb-4">
          Redonner confiance par l’image
        </h1>
        <h2 className="text-lg sm:text-xl md:text-2xl text-[#FFD700]/90 mb-8">
          Accompagnement à la réinsertion par l’image de soi
        </h2>

        <motion.div
          whileHover={{scale: 1.05}}
          whileTap={{scale: 0.95}}
          transition={{type: 'spring', stiffness: 300}}
        >
          <Button
            variant="heroSection"
            size="lg"
            href="#actions"
            onClick={() => console.log('Bouton Hero cliqué !')}
          >
            Découvrir nos actions
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
