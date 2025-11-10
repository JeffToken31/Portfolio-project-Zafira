'use client';
import {Button} from '@/components/uiStyled/button';
import {useState, useRef, useEffect} from 'react';
import {LogOut, Users} from 'lucide-react';
import {useAuth} from '@/lib/hooks/useAuth';
import Link from 'next/link';
import {motion, AnimatePresence} from 'framer-motion';
import {fetchUser} from '@/lib/api/auth'; // ton fetchUser existant

export default function UserMenuDialog() {
  const {logout} = useAuth();
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<'admin' | 'beneficiary' | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // --- récupérer le rôle via l'API
  useEffect(() => {
    fetchUser()
      .then((data) => {
        const userRole = data?.user?.role?.toLowerCase();
        if (userRole === 'admin' || userRole === 'beneficiary') {
          setRole(userRole);
        } else {
          setRole(null);
        }
      })
      .catch((err) => {
        console.error('Erreur fetchUser:', err);
        setRole(null);
      });
  }, []);

  const dashboardLink =
    role === 'beneficiary'
      ? '/dashboard/beneficiary'
      : role === 'admin'
      ? '/dashboard/admin'
      : '/';
  const dashboardLabel =
    role === 'beneficiary'
      ? 'Mon espace bénéficiaire'
      : role === 'admin'
      ? 'Mon espace admin'
      : 'Dashboard';

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Button onClick={() => setOpen(!open)} variant="connect" size="sm">
        Mon profil
      </Button>

      <AnimatePresence>
        {open && role !== null && (
          <motion.div
            initial={{opacity: 0, y: -10}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -10}}
            transition={{duration: 0.2}}
            className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50 overflow-hidden pointer-events-auto"
          >
            <Link
              href={dashboardLink}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors"
            >
              <Users className="w-4 h-4" /> {dashboardLabel}
            </Link>

            <button
              onClick={logout}
              className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Déconnexion
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
