import React from 'react';
import { useAuth } from '../features/auth/hooks/useAuth';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { View, ActivityIndicator, Text } from 'react-native';

/**
 * Main navigation container that handles authentication-based routing
 * Renders AuthStack for unauthenticated users and MainStack for authenticated users
 */
export default function Navigation() {
  const { isAuthenticated, loading } = useAuth();

  // Show loading indicator while checking authentication status
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text className="text-textPrimary mt-4">Loading...</Text>
      </View>
    );
  }

  // Render the appropriate stack based on authentication status
  return isAuthenticated ? <MainStack /> : <AuthStack />;
}
