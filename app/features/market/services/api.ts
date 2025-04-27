// API service for fetching cryptocurrency data

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

export interface CoinResponse {
  data: CoinData[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

// Tab types
export type TabType = 'Featured' | 'Top Gainers' | 'Top Losers';

// API endpoint
const API_URL = 'https://coingeko.burjx.com/coin-prices-all';

/**
 * Fetches cryptocurrency data from the API
 * @param currency The currency to fetch prices in (default: 'usd')
 * @param page The page number to fetch (default: 1)
 * @param pageSize The number of items per page (default: 10)
 * @returns A promise that resolves to the API response
 */
export const fetchCoinData = async (
  currency: string = 'usd',
  page: number = 1,
  pageSize: number = 10
): Promise<CoinResponse> => {
  try {
    const response = await fetch(
      `${API_URL}?currency=${currency}&page=${page}&pageSize=${pageSize}`
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: CoinResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching coin data:', error);
    throw error;
  }
};

/**
 * Fetches featured coins (first 5 coins)
 * @param currency The currency to fetch prices in (default: 'usd')
 * @returns A promise that resolves to an array of CoinData
 */
export const fetchFeaturedCoins = async (
  currency: string = 'usd'
): Promise<CoinData[]> => {
  try {
    const response = await fetchCoinData(currency, 1, 5);
    return response.data;
  } catch (error) {
    console.error('Error fetching featured coins:', error);
    throw error;
  }
};

/**
 * Fetches top gainers (coins with highest price change percentage)
 * @param currency The currency to fetch prices in (default: 'usd')
 * @param limit The number of coins to fetch (default: 5)
 * @returns A promise that resolves to an array of CoinData
 */
export const fetchTopGainers = async (
  currency: string = 'usd',
  limit: number = 5
): Promise<CoinData[]> => {
  try {
    const response = await fetchCoinData(currency, 1, 20);
    // Sort by price change percentage in descending order
    const sortedCoins = [...response.data].sort(
      (a, b) => b.priceChangePercentage24h - a.priceChangePercentage24h
    );
    return sortedCoins.slice(0, limit);
  } catch (error) {
    console.error('Error fetching top gainers:', error);
    throw error;
  }
};

/**
 * Fetches top losers (coins with lowest price change percentage)
 * @param currency The currency to fetch prices in (default: 'usd')
 * @param limit The number of coins to fetch (default: 5)
 * @returns A promise that resolves to an array of CoinData
 */
export const fetchTopLosers = async (
  currency: string = 'usd',
  limit: number = 5
): Promise<CoinData[]> => {
  try {
    const response = await fetchCoinData(currency, 1, 20);
    // Sort by price change percentage in ascending order
    const sortedCoins = [...response.data].sort(
      (a, b) => a.priceChangePercentage24h - b.priceChangePercentage24h
    );
    return sortedCoins.slice(0, limit);
  } catch (error) {
    console.error('Error fetching top losers:', error);
    throw error;
  }
};

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
