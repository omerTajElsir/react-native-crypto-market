// API service for fetching cryptocurrency details data

// Define types for the API response
export interface CoinData {
  productId: number;
  id: string;
  name: string;
  image: string;
  currentPrice: number;
  priceChangePercentage24h: number;
  sparkline: number[];
  marketCap: number;
  tradingVolume: number;
  symbol: string;
}

// Define types for OHLC data
export interface OHLCData {
  date: number;
  usd: {
    open: number;
    high: number;
    low: number;
    close: number;
  };
  aed: {
    open: number;
    high: number;
    low: number;
    close: number;
  };
}

/**
 * Fetches OHLC (Open, High, Low, Close) data for a specific coin
 * @param productId The ID of the coin to fetch data for
 * @param days The number of days of data to fetch (1, 7, 30, 365, or 'max')
 * @returns A promise that resolves to an array of OHLCData
 */
export const fetchCoinOHLC = async (
  productId: number,
  days: number | 'max' = 1
): Promise<OHLCData[]> => {
  try {
    const response = await fetch(
      `https://coingeko.burjx.com/coin-ohlc?productId=${productId}&days=${days}`
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: OHLCData[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching coin OHLC data:', error);
    throw error;
  }
};