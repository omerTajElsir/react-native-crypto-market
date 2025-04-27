# Authentication

This directory contains the authentication feature for the React Native Crypto Market app. The authentication system uses biometric authentication (fingerprint, Face ID) to secure the app.

## Overview

The authentication feature consists of:

- **Hooks**: Custom hooks for managing authentication state and methods
- **Screens**: Authentication screens for user login
- **Context**: Authentication context provider for global state management

## Authentication Flow

1. When the app starts, it checks if the user is authenticated
2. If not authenticated, the user is presented with the biometric authentication screen
3. The user authenticates using their device's biometric features (fingerprint, Face ID)
4. Upon successful authentication, the user is redirected to the main app screens

## Components

### Hooks

#### useAuth

A hook for accessing authentication functionality.

```typescript
import { useAuth } from '@/app/features/auth/hooks/useAuth';

function MyComponent() {
  const { isAuthenticated, loading, authenticate, logout } = useAuth();
  
  // Use authentication state and methods
}
```

**Returns:**
- `isAuthenticated` (boolean): Whether the user is authenticated
- `loading` (boolean): Whether authentication is in progress
- `authenticate` (function): Function to trigger authentication
- `logout` (function): Function to log out the user

### Screens

#### BiometricAuthScreen

A screen that prompts the user for biometric authentication.

```typescript
import BiometricAuthScreen from '@/app/features/auth/screens/biometric_auth_screen';

// Used in navigation
<Stack.Screen name="auth/biometric" component={BiometricAuthScreen} />
```

## Usage

### Setting Up Authentication

The authentication system is set up in the app's entry point:

```typescript
import { AuthProvider } from '@/app/contexts/auth_context';

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
```

### Protecting Routes

Routes can be protected using the `useAuth` hook:

```typescript
import { useAuth } from '@/app/features/auth/hooks/useAuth';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  if (!isAuthenticated) {
    return <BiometricAuthScreen />;
  }
  
  return children;
}
```

### Triggering Authentication

Authentication can be triggered using the `authenticate` method from the `useAuth` hook:

```typescript
import { useAuth } from '@/app/features/auth/hooks/useAuth';

function LoginButton() {
  const { authenticate } = useAuth();
  
  return (
    <Button 
      label="Login with Biometrics" 
      onPress={() => authenticate()} 
    />
  );
}
```

## Best Practices

1. **Always check authentication state**: Before rendering protected content, always check if the user is authenticated.
2. **Handle authentication errors**: Provide clear feedback to the user when authentication fails.
3. **Provide fallback options**: If biometric authentication is not available, provide alternative authentication methods.
4. **Secure sensitive data**: Use secure storage for any sensitive data that needs to be persisted.