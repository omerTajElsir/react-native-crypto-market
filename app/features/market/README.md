# Market

This directory contains the market feature for the React Native Crypto Market app. This feature provides an overview of the cryptocurrency market, including listings of coins, featured coins, and price trends.

## Overview

The market feature consists of:

- **Components**: UI components for displaying market data
- **Hooks**: Custom hooks for fetching and managing market data
- **Screens**: Screens for viewing market information
- **Services**: API services for fetching market data

## Components

### CoinCard

A card component for displaying individual coin information in a list.

```typescript
import { CoinCard } from '@/app/features/market/components/coin_card';

// Basic usage
<CoinCard 
  coin={coinData} 
  onPress={() => handleCoinPress(coinData.id)} 
/>
```

**Props:**
- `coin` (object): Coin data object with name, symbol, price, etc.
- `onPress` (function): Function to call when the card is pressed

### FeaturedCard

A card component for displaying featured or trending coins.

```typescript
import { FeaturedCard } from '@/app/features/market/components/featured_card';

// Basic usage
<FeaturedCard 
  coin={featuredCoin} 
  onPress={() => handleCoinPress(featuredCoin.id)} 
/>
```

**Props:**
- `coin` (object): Featured coin data object
- `onPress` (function): Function to call when the card is pressed

### LineChart

A simple line chart component for displaying price trends.

```typescript
import { LineChart } from '@/app/features/market/components/line_chart';

// Basic usage
<LineChart 
  data={priceData} 
  width={100} 
  height={50} 
/>

// With custom styling
<LineChart 
  data={priceData} 
  width={100} 
  height={50}
  lineColor="#4ADE80"
  fillColor="rgba(74, 222, 128, 0.2)"
/>
```

**Props:**
- `data` (array): Array of price data points
- `width` (number): Width of the chart
- `height` (number): Height of the chart
- `lineColor` (string, optional): Color of the chart line
- `fillColor` (string, optional): Color of the area below the line

### CandleChart

A candlestick chart component for displaying price movements.

```typescript
import { CandleChart } from '@/app/features/market/components/candle_chart';

// Basic usage
<CandleChart 
  data={candleData} 
  width={100} 
  height={50} 
/>
```

**Props:**
- `data` (array): Array of candle data objects
- `width` (number): Width of the chart
- `height` (number): Height of the chart

## Hooks

### useMarketData

A hook for fetching and managing cryptocurrency market data.

```typescript
import { useMarketData } from '@/app/features/market/hooks/useMarketData';

function MarketList() {
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

**Returns:**
- `coins` (array): Array of coin data objects
- `loading` (boolean): Whether the initial data is loading
- `loadingMore` (boolean): Whether more data is being loaded
- `error` (string): Error message if data fetching failed
- `currentPage` (number): Current page of data
- `totalPages` (number): Total number of pages available
- `loadMoreCoins` (function): Function to load more coins
- `refreshCoins` (function): Function to refresh the coin data

### useFeaturedCoins

A hook for fetching and managing featured cryptocurrency data.

```typescript
import { useFeaturedCoins } from '@/app/features/market/hooks/useFeaturedCoins';

function FeaturedCoins() {
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

**Returns:**
- `featuredCoins` (array): Array of featured coin data objects
- `loading` (boolean): Whether the data is loading
- `error` (string): Error message if data fetching failed
- `selectedTab` (string): Currently selected tab
- `changeTab` (function): Function to change the selected tab
- `refreshFeaturedCoins` (function): Function to refresh the featured coins data

## Screens

### MarketScreen

The main screen for displaying the market overview.

```typescript
// Used in navigation
<Stack.Screen 
  name="features/market/screens/market_screen" 
  options={{
    title: "Market"
  }}
/>
```

**Features:**
- Featured coins section with tabs for different categories
- Market overview with a list of coins
- Search functionality
- Pull-to-refresh for updating data
- Infinite scrolling for loading more coins

## Services

### API

Services for fetching market data from external APIs.

```typescript
import { 
  getMarketData, 
  getFeaturedCoins 
} from '@/app/features/market/services/api';

// Get market data
const marketData = await getMarketData('usd', 1, 20);

// Get featured coins
const featuredCoins = await getFeaturedCoins('trending', 'usd');
```

**Available Functions:**
- `getMarketData(currency, page, perPage)`: Fetches market data for a list of coins
- `getFeaturedCoins(category, currency)`: Fetches featured coins for a specific category

## Usage

### Displaying Market Data

To display the market data in a list:

```typescript
import { useMarketData } from '@/app/features/market/hooks/useMarketData';
import { CoinCard } from '@/app/features/market/components/coin_card';
import { FlatList } from 'react-native';

function MarketList() {
  const { 
    coins,
    loading,
    loadingMore,
    error,
    loadMoreCoins,
    refreshCoins
  } = useMarketData('usd', 20);
  
  const handleCoinPress = (coinId) => {
    // Navigate to coin details
  };
  
  if (loading && coins.length === 0) {
    return <LoadingIndicator />;
  }
  
  if (error) {
    return <ErrorMessage message={error} />;
  }
  
  return (
    <FlatList
      data={coins}
      renderItem={({ item }) => (
        <CoinCard 
          coin={item} 
          onPress={() => handleCoinPress(item.id)} 
        />
      )}
      keyExtractor={(item) => item.id}
      onEndReached={loadMoreCoins}
      onEndReachedThreshold={0.5}
      refreshing={loading}
      onRefresh={refreshCoins}
      ListFooterComponent={loadingMore ? <LoadingIndicator /> : null}
    />
  );
}
```

### Displaying Featured Coins

To display featured coins with tabs:

```typescript
import { useFeaturedCoins } from '@/app/features/market/hooks/useFeaturedCoins';
import { FeaturedCard } from '@/app/features/market/components/featured_card';
import { ScrollView, View } from 'react-native';
import { Text, Button } from '@/app/components/ui';

function FeaturedCoins() {
  const { 
    featuredCoins,
    loading,
    error,
    selectedTab,
    changeTab,
    refreshFeaturedCoins
  } = useFeaturedCoins('Featured', 'usd');
  
  const tabs = ['Featured', 'Trending', 'Gainers', 'Losers'];
  
  const handleCoinPress = (coinId) => {
    // Navigate to coin details
  };
  
  if (loading && featuredCoins.length === 0) {
    return <LoadingIndicator />;
  }
  
  if (error) {
    return <ErrorMessage message={error} />;
  }
  
  return (
    <View>
      <View className="flex-row mb-4">
        {tabs.map((tab) => (
          <Button
            key={tab}
            label={tab}
            variant={selectedTab === tab ? 'primary' : 'outline'}
            size="sm"
            onPress={() => changeTab(tab)}
            className="mr-2"
          />
        ))}
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {featuredCoins.map((coin) => (
          <FeaturedCard
            key={coin.id}
            coin={coin}
            onPress={() => handleCoinPress(coin.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
```

## Best Practices

1. **Optimize list rendering**: Use FlatList with proper key extraction and pagination for better performance.
2. **Handle loading states**: Always show loading indicators when fetching data to provide feedback to users.
3. **Error handling**: Implement proper error handling for API requests to provide feedback when data fetching fails.
4. **Pull-to-refresh**: Implement pull-to-refresh functionality for updating data.
5. **Infinite scrolling**: Implement infinite scrolling for loading more data as the user scrolls.