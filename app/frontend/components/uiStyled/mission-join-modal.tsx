'use client';

import { Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MissionJoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MissionJoinModal({ isOpen, onClose }: MissionJoinModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Mail className="mx-auto w-12 h-12 text-[#38b6ff] mb-4" />
          <h3 className="text-xl font-semibold mb-3">Rejoignez nos bénévoles 💙</h3>
          <p className="text-gray-700 mb-6">
            Si vous souhaitez rejoindre notre équipe de bénévoles,
            vous pouvez envoyer un mail à :
          </p>

          <a
            href="mailto:contact@zafiravestiairesolidaire.org"
            className="text-[#38b6ff] font-medium underline hover:text-blue-600 transition-colors"
          >
            contact@zafiravestiairesolidaire.org
          </a>

          <button
            onClick={onClose}
            className="mt-6 px-6 py-2 bg-[#38b6ff] text-white rounded-full hover:bg-blue-500 transition-all"
          >
            Fermer
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
