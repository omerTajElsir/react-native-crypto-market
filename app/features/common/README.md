# Common

This directory contains common components and hooks that are shared across multiple features in the React Native Crypto Market app. These shared elements help maintain consistency and reduce code duplication.

## Overview

The common feature consists of:

- **Components**: Shared UI components used across the app
- **Hooks**: Shared custom hooks for common functionality

## Components

### AppBar

A component for the application's top navigation bar.

```typescript
import { AppBar } from '@/app/features/common/components/app_bar';

// Basic usage
<AppBar title="Market" />

// With back button
<AppBar 
  title="Coin Details" 
  showBackButton={true} 
  onBackPress={() => router.back()} 
/>

// With actions
<AppBar 
  title="Market" 
  actions={[
    {
      icon: "settings",
      onPress: () => handleSettingsPress()
    }
  ]}
/>
```

**Props:**
- `title` (string): The title to display in the app bar
- `showBackButton` (boolean, optional): Whether to show a back button
- `onBackPress` (function, optional): Function to call when the back button is pressed
- `actions` (array, optional): Array of action objects with icon and onPress properties

### SearchBar

A component for searching and filtering data.

```typescript
import { SearchBar } from '@/app/features/common/components/search_bar';

// Basic usage
<SearchBar 
  value={searchQuery} 
  onChangeText={setSearchQuery} 
  placeholder="Search coins..." 
/>

// With clear button
<SearchBar 
  value={searchQuery} 
  onChangeText={setSearchQuery} 
  placeholder="Search coins..." 
  showClearButton={true}
  onClear={() => setSearchQuery('')}
/>
```

**Props:**
- `value` (string): The current search query
- `onChangeText` (function): Function to call when the search query changes
- `placeholder` (string, optional): Placeholder text to display when the search bar is empty
- `showClearButton` (boolean, optional): Whether to show a clear button
- `onClear` (function, optional): Function to call when the clear button is pressed

## Hooks

### useSearch

A hook for searching and filtering data.

```typescript
import { useSearch } from '@/app/features/common/hooks/useSearch';

function CoinList({ coins }) {
  const { 
    searchQuery,
    filteredData,
    handleSearch,
    clearSearch
  } = useSearch(coins, ['name', 'symbol']);
  
  return (
    <>
      <SearchBar 
        value={searchQuery} 
        onChangeText={handleSearch} 
        placeholder="Search coins..." 
        showClearButton={true}
        onClear={clearSearch}
      />
      
      <FlatList 
        data={filteredData}
        renderItem={({ item }) => <CoinCard coin={item} />}
        keyExtractor={(item) => item.id}
      />
    </>
  );
}
```

**Parameters:**
- `data` (array): The array of data to search through
- `searchKeys` (array): Array of keys to search in each data item

**Returns:**
- `searchQuery` (string): The current search query
- `filteredData` (array): The filtered data based on the search query
- `handleSearch` (function): Function to update the search query
- `clearSearch` (function): Function to clear the search query

## Usage

### Using AppBar in Screens

To use the AppBar in a screen component:

```typescript
import { AppBar } from '@/app/features/common/components/app_bar';
import { useRouter } from 'expo-router';

function CoinDetailsScreen() {
  const router = useRouter();
  
  return (
    <View className="flex-1">
      <AppBar 
        title="Coin Details" 
        showBackButton={true} 
        onBackPress={() => router.back()} 
      />
      
      {/* Screen content */}
    </View>
  );
}
```

### Implementing Search Functionality

To implement search functionality in a screen:

```typescript
import { useState } from 'react';
import { View, FlatList } from 'react-native';
import { SearchBar } from '@/app/features/common/components/search_bar';
import { useSearch } from '@/app/features/common/hooks/useSearch';
import { CoinCard } from '@/app/features/market/components/coin_card';

function MarketScreen({ coins }) {
  const { 
    searchQuery,
    filteredData,
    handleSearch,
    clearSearch
  } = useSearch(coins, ['name', 'symbol']);
  
  return (
    <View className="flex-1">
      <SearchBar 
        value={searchQuery} 
        onChangeText={handleSearch} 
        placeholder="Search coins..." 
        showClearButton={true}
        onClear={clearSearch}
      />
      
      <FlatList 
        data={filteredData}
        renderItem={({ item }) => <CoinCard coin={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
```

## Best Practices

1. **Reuse common components**: Use these shared components instead of creating duplicate components in each feature.
2. **Keep components focused**: Each component should have a single responsibility and be reusable across different contexts.
3. **Consistent props**: Maintain consistent prop names and patterns across all common components.
4. **Accessibility**: Ensure all common components follow accessibility best practices.
5. **Documentation**: When adding new common components or hooks, document them in this README.