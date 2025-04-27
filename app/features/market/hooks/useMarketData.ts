import { useState, useEffect, useCallback } from 'react';
import { fetchCoinData, CoinData, CoinResponse } from '../services/api';

/**
 * Custom hook for fetching and managing cryptocurrency market data
 * @param currency The currency to fetch prices in (default: 'usd')
 * @param initialPageSize The number of items per page (default: 10)
 * @returns An object containing market data, loading states, and functions to manage the data
 */
export const useMarketData = (currency: string = 'usd', initialPageSize: number = 10) => {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  /**
   * Fetches the initial coin data
   */
  const fetchInitialCoins = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchCoinData(currency, 1, initialPageSize);
      setCoins(response.data);
      setTotalPages(response.totalPages);
      setError(null);
    } catch (err) {
      setError('Failed to load coin data. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currency, initialPageSize]);

  /**
   * Loads more coins when user scrolls to the bottom
   */
  const loadMoreCoins = useCallback(async () => {
    if (loadingMore || currentPage >= totalPages) return;

    try {
      setLoadingMore(true);
      const nextPage = currentPage + 1;
      const response = await fetchCoinData(currency, nextPage, initialPageSize);

      setCoins(prevCoins => [...prevCoins, ...response.data]);
      setCurrentPage(nextPage);
      setError(null);
    } catch (err) {
      setError('Failed to load more coins. Please try again later.');
      console.error(err);
    } finally {
      setLoadingMore(false);
    }
  }, [currency, currentPage, initialPageSize, loadingMore, totalPages]);

  /**
   * Refreshes the coin data
   */
  const refreshCoins = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchCoinData(currency, 1, initialPageSize);
      setCoins(response.data);
      setTotalPages(response.totalPages);
      setCurrentPage(1);
      setError(null);
    } catch (err) {
      setError('Failed to refresh coin data. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currency, initialPageSize]);

  // Load initial coins on mount
  useEffect(() => {
    fetchInitialCoins();
  }, [fetchInitialCoins]);

  return {
    coins,
    loading,
    loadingMore,
    error,
    currentPage,
    totalPages,
    loadMoreCoins,
    refreshCoins,
  };
};