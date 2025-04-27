import { useState, useEffect, useCallback } from 'react';
import { 
  fetchFeaturedCoins, 
  fetchTopGainers, 
  fetchTopLosers, 
  CoinData, 
  TabType 
} from '../services/api';

/**
 * Custom hook for fetching and managing featured cryptocurrency data
 * @param initialTab The initial tab to display (default: 'Featured')
 * @param currency The currency to fetch prices in (default: 'usd')
 * @returns An object containing featured coins data, loading state, error state, and functions to manage the data
 */
export const useFeaturedCoins = (initialTab: TabType = 'Featured', currency: string = 'usd') => {
  const [featuredCoins, setFeaturedCoins] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<TabType>(initialTab);

  /**
   * Fetches featured coins based on the selected tab
   */
  const fetchCoinsForTab = useCallback(async (tab: TabType) => {
    try {
      setLoading(true);
      let data: CoinData[] = [];

      switch (tab) {
        case 'Featured':
          data = await fetchFeaturedCoins(currency);
          break;
        case 'Top Gainers':
          data = await fetchTopGainers(currency);
          break;
        case 'Top Losers':
          data = await fetchTopLosers(currency);
          break;
      }

      setFeaturedCoins(data);
      setError(null);
    } catch (err) {
      setError('Failed to load featured coins. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currency]);

  /**
   * Changes the selected tab and fetches the corresponding data
   */
  const changeTab = useCallback((tab: TabType) => {
    setSelectedTab(tab);
    fetchCoinsForTab(tab);
  }, [fetchCoinsForTab]);

  /**
   * Refreshes the featured coins data for the current tab
   */
  const refreshFeaturedCoins = useCallback(() => {
    fetchCoinsForTab(selectedTab);
  }, [fetchCoinsForTab, selectedTab]);

  // Fetch featured coins when the selected tab changes
  useEffect(() => {
    fetchCoinsForTab(selectedTab);
  }, [fetchCoinsForTab, selectedTab]);

  return {
    featuredCoins,
    loading,
    error,
    selectedTab,
    changeTab,
    refreshFeaturedCoins,
  };
};