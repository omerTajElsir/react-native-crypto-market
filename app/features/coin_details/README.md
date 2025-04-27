# Coin Details

This directory contains the coin details feature for the React Native Crypto Market app. This feature provides detailed information about specific cryptocurrencies, including price charts, market statistics, and historical data.

## Overview

The coin details feature consists of:

- **Components**: UI components for displaying coin data
- **Screens**: Screens for viewing detailed coin information
- **Services**: API services for fetching coin data

## Components

### CandleChart

A component for displaying price charts for cryptocurrencies using a candlestick chart.

```typescript
import { CandleChart } from '@/app/features/coin_details/components/candle_chart';

// Basic usage
<CandleChart 
  data={candleData} 
  width={350} 
  height={220} 
/>

// With custom styling
<CandleChart 
  data={candleData} 
  width={350} 
  height={220}
  upColor="#4ADE80"
  downColor="#F87171"
  backgroundColor="transparent"
/>
```

**Props:**
- `data` (array): Array of candle data objects with open, high, low, close values
- `width` (number): Width of the chart
- `height` (number): Height of the chart
- `upColor` (string, optional): Color for upward price movement
- `downColor` (string, optional): Color for downward price movement
- `backgroundColor` (string, optional): Background color of the chart

## Screens

### CoinDetailsScreen

The main screen for displaying detailed information about a cryptocurrency.

```typescript
// Used in navigation
<Stack.Screen 
  name="features/coin_details/screens/coin_details_screen" 
  options={{
    title: "Coin Details"
  }}
/>
```

**Features:**
- Price chart with multiple timeframe options
- Current price and price change information
- Market statistics (market cap, volume, etc.)
- Historical price data
- About section with coin description

## Services

### API

Services for fetching coin data from external APIs.

```typescript
import { 
  getCoinDetails, 
  getCoinChartData 
} from '@/app/features/coin_details/services/api';

// Get coin details
const coinDetails = await getCoinDetails('bitcoin');

// Get chart data for a specific coin and timeframe
const chartData = await getCoinChartData('bitcoin', '7d');
```

**Available Functions:**
- `getCoinDetails(coinId)`: Fetches detailed information about a specific coin
- `getCoinChartData(coinId, timeframe)`: Fetches chart data for a specific coin and timeframe

## Usage

### Navigating to Coin Details

To navigate to the coin details screen from another part of the app:

```typescript
import { useRouter } from 'expo-router';

function CoinListItem({ coin }) {
  const router = useRouter();
  
  const handlePress = () => {
    router.push(`/features/coin_details/screens/coin_details_screen?id=${coin.id}`);
  };
  
  return (
    <TouchableOpacity onPress={handlePress}>
      <Text>{coin.name}</Text>
    </TouchableOpacity>
  );
}
```

### Displaying Chart Data

To display chart data in the CandleChart component:

```typescript
import { useEffect, useState } from 'react';
import { CandleChart } from '@/app/features/coin_details/components/candle_chart';
import { getCoinChartData } from '@/app/features/coin_details/services/api';

function CoinChart({ coinId }) {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCoinChartData(coinId, '7d');
        setChartData(data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [coinId]);
  
  if (loading) {
    return <LoadingIndicator />;
  }
  
  return (
    <CandleChart 
      data={chartData} 
      width={350} 
      height={220} 
    />
  );
}
```

## Best Practices

1. **Optimize chart rendering**: The candle chart can be performance-intensive, so optimize rendering for better performance.
2. **Handle loading states**: Always show loading indicators when fetching data to provide feedback to users.
3. **Error handling**: Implement proper error handling for API requests to provide feedback when data fetching fails.
4. **Caching**: Consider caching coin data to reduce API calls and improve performance.
5. **Responsive design**: Ensure the chart and other UI elements adapt to different screen sizes.