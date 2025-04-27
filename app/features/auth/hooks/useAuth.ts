import { useAuth as useAuthContext } from '@/app/contexts/AuthContext';

/**
 * Custom hook for accessing authentication functionality
 * This is a wrapper around the useAuth hook from AuthContext
 * to maintain consistency with our feature-based hook structure
 * 
 * @returns Authentication state and methods from AuthContext
 */
export const useAuth = () => {
  return useAuthContext();
};