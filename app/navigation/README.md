# Navigation Structure

This folder contains the navigation structure for the React Native Crypto Market app. The navigation is organized into stacks based on authentication status.

## Overview

The navigation structure is built using Expo Router, which is a file-system based router for React Native. The main components are:

- **Navigation Container**: The main component that handles authentication-based routing.
- **AuthStack**: The stack for unauthenticated users, containing authentication screens.
- **MainStack**: The stack for authenticated users, containing the main app screens.

## Authentication Flow

The app uses a context-based authentication system. The `AuthContext` provides authentication state and methods to the entire app. The navigation structure uses this context to determine which stack to render.

```
App
├── AuthProvider (Context)
│   └── Navigation
│       ├── AuthStack (if not authenticated)
│       │   └── BiometricAuthScreen
│       └── MainStack (if authenticated)
│           ├── MarketScreen
│           └── CoinDetailsScreen
```

## Navigation Guards

Navigation guards are implemented using the `useAuth` hook from the `AuthContext`. The `Navigation` component checks the authentication status and renders the appropriate stack.

```typescript
export default function Navigation() {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  return isAuthenticated ? <MainStack /> : <AuthStack />;
}
```

## Adding New Screens

To add a new screen to the authenticated section of the app:

1. Create the screen component in the appropriate feature folder
2. Add the screen to the MainStack in `MainStack.tsx`

```typescript
<Stack.Screen
  name="features/your-feature/screens/your-screen"
  options={{
    // Your screen options
  }}
/>
```

To add a new authentication screen:

1. Create the screen component in the auth feature folder
2. Update the AuthStack in `AuthStack.tsx` to include the new screen

## Navigation Between Screens

To navigate between screens, use the `useRouter` hook from Expo Router:

```typescript
import { useRouter } from 'expo-router';

function YourComponent() {
  const router = useRouter();
  
  const handleNavigation = () => {
    router.push('/features/your-feature/screens/your-screen');
  };
  
  return (
    <Button onPress={handleNavigation} title="Go to Screen" />
  );
}
```