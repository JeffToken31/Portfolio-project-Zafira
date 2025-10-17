import { useAuthContext } from '@/lib/context/AuthContext';

export const useAuth = () => {
  return useAuthContext();
};
