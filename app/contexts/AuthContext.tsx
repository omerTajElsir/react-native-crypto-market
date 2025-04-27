import React, { createContext, useContext, useState, useEffect } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

// Define the shape of our authentication context
interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  authenticate: () => Promise<boolean>;
  logout: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider component that wraps the app and makes auth object available
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Check if user is authenticated on initial load
  useEffect(() => {
    // In a real app, you might check for a token in AsyncStorage
    // For now, we'll just set loading to false
    setLoading(false);
  }, []);

  // Function to handle biometric authentication
  const authenticate = async (): Promise<boolean> => {
    try {
      const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();
      
      if (!isBiometricAvailable) {
        console.log('Biometric authentication not available');
        // For demo purposes, we'll authenticate anyway
        setIsAuthenticated(true);
        return true;
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        console.log('No biometrics enrolled');
        // For demo purposes, we'll authenticate anyway
        setIsAuthenticated(true);
        return true;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to access your account',
      });

      if (result.success) {
        setIsAuthenticated(true);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Authentication error:', error);
      return false;
    }
  };

  // Function to handle logout
  const logout = () => {
    setIsAuthenticated(false);
  };

  // The value that will be provided to consumers of this context
  const value = {
    isAuthenticated,
    loading,
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};