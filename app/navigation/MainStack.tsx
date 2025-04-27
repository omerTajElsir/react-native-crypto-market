import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { useAuth } from '../features/auth/hooks/useAuth';
import { TouchableOpacity, Text, View } from 'react-native';
import MarketScreen from '../features/market/screens/market_screen';

/**
 * MainStack - Navigation stack for authenticated users
 * Contains screens related to the main functionality of the app
 * 
 * Note: In Expo Router, we don't directly render screens in the stack.
 * Instead, we configure the stack and let Expo Router handle the rendering
 * based on the current route.
 */
export default function MainStack() {
  const { logout } = useAuth();
  const router = useRouter();

  // Redirect to the market screen
  React.useEffect(() => {
    router.replace('/features/market/screens/market_screen');
  }, []);

  return (
    <Stack screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen
        name="features/market/screens/market_screen"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="features/market/screens/coin_details_screen"
        options={{
          headerShown: true,
          headerTitle: 'Coin Details',
          headerStyle: {
            backgroundColor: '#121212', // Match the app's background color
          },
          headerTintColor: '#FFFFFF',
          headerRight: () => (
            <TouchableOpacity onPress={logout} className="mr-4">
              <Text className="text-primary">Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
