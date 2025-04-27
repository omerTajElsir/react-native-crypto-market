import React from 'react';
import { Stack } from 'expo-router';
import BiometricAuthScreen from '../features/auth/screens/biometric_auth_screen';
import { View } from 'react-native';

/**
 * AuthStack - Navigation stack for unauthenticated users
 * Contains screens related to authentication (login, signup, etc.)
 */
export default function AuthStack() {
  return (
    <View className="flex-1 bg-background">
      {/* We're using a simple View with BiometricAuthScreen for now */}
      {/* In a more complex app, this could be a Stack navigator with multiple auth screens */}
      <BiometricAuthScreen />
    </View>
  );
}