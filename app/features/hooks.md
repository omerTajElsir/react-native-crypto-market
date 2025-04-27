# Custom Hooks

This document provides an overview of the custom hooks available in the React Native Crypto Market app. These hooks encapsulate reusable logic for data fetching, state management, and other common operations.

## Directory Structure

The hooks are organized by feature:

```
/app
  /features
    /auth
      /hooks
        useAuth.ts
    /market
      /hooks
        useMarketData.ts
        useFeaturedCoins.ts
    /common
      /hooks
        useSearch.ts
```

## Authentication Hooks

### useAuth

A hook for accessing authentication functionality.

```typescript
import { useAuth } from '@/app/features/auth/hooks/useAuth';

function MyComponent() {
  const { isAuthenticated, loading, authenticate, logout } = useAuth();
  
  // Use authentication state and methods
}
```

## Market Data Hooks

### useMarketData

A hook for fetching and managing cryptocurrency market data.

```typescript
import { useMarketData } from '@/app/features/market/hooks/useMarketData';

function MyComponent() {
  const { 
    coins,
    loading,
    loadingMore,
    error,
    currentPage,
    totalPages,
    loadMoreCoins,
    refreshCoins
  } = useMarketData('usd', 10);
  
  // Use market data and methods
}
```

### useFeaturedCoins

A hook for fetching and managing featured cryptocurrency data.

```typescript
import { useFeaturedCoins } from '@/app/features/market/hooks/useFeaturedCoins';

function MyComponent() {
  const { 
    featuredCoins,
    loading,
    error,
    selectedTab,
    changeTab,
    refreshFeaturedCoins
  } = useFeaturedCoins('Featured', 'usd');
  
  // Use featured coins data and methods
}
```

## Common Hooks

### useSearch

A hook for searching and filtering data.

```typescript
import { useSearch } from '@/app/features/common/hooks/useSearch';

function MyComponent() {
  const data = [/* your data array */];
  
  const { 
    searchQuery,
    filteredData,
    handleSearch,
    clearSearch
  } = useSearch(data, ['name', 'symbol']);
  
  // Use search functionality
}
```

## Best Practices

1. **Use the appropriate hook for the task**: Choose the hook that best fits your needs to avoid duplicating logic.
2. **Keep components focused on rendering**: Move complex logic to custom hooks to keep your components clean and focused on rendering UI.
3. **Combine hooks when needed**: You can use multiple hooks together in a component to handle different aspects of functionality.
4. **Create new hooks for reusable logic**: If you find yourself duplicating logic across components, consider creating a new custom hook.