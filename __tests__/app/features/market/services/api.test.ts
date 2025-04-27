import { 
  fetchCoinData, 
  fetchFeaturedCoins, 
  fetchTopGainers, 
  fetchTopLosers, 
  fetchCoinOHLC,
  CoinData,
  OHLCData,
  CoinResponse
} from '@/app/features/market/services/api';

// Mock the global fetch function
global.fetch = jest.fn();

// Helper to setup fetch mock
const setupFetchMock = (data: any, status = 200) => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: status === 200,
    status,
    json: jest.fn().mockResolvedValueOnce(data)
  });
};

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

describe('Market API Service', () => {
  describe('fetchCoinData', () => {
    it('should fetch coin data with default parameters', async () => {
      // Mock data
      const mockResponse: CoinResponse = {
        data: [
          {
            productId: 1,
            id: 'bitcoin',
            name: 'Bitcoin',
            image: 'bitcoin.png',
            currentPrice: 50000,
            priceChangePercentage24h: 5,
            sparkline: [49000, 50000, 51000],
            marketCap: 1000000000000,
            tradingVolume: 50000000000,
            symbol: 'BTC'
          }
        ],
        page: 1,
        pageSize: 10,
        totalItems: 100,
        totalPages: 10
      };

      // Setup mock
      setupFetchMock(mockResponse);

      // Call the function
      const result = await fetchCoinData();

      // Assertions
      expect(global.fetch).toHaveBeenCalledWith(
        'https://coingeko.burjx.com/coin-prices-all?currency=usd&page=1&pageSize=10'
      );
      expect(result).toEqual(mockResponse);
    });

    it('should fetch coin data with custom parameters', async () => {
      // Mock data
      const mockResponse: CoinResponse = {
        data: [
          {
            productId: 1,
            id: 'bitcoin',
            name: 'Bitcoin',
            image: 'bitcoin.png',
            currentPrice: 50000,
            priceChangePercentage24h: 5,
            sparkline: [49000, 50000, 51000],
            marketCap: 1000000000000,
            tradingVolume: 50000000000,
            symbol: 'BTC'
          }
        ],
        page: 2,
        pageSize: 20,
        totalItems: 100,
        totalPages: 5
      };

      // Setup mock
      setupFetchMock(mockResponse);

      // Call the function
      const result = await fetchCoinData('eur', 2, 20);

      // Assertions
      expect(global.fetch).toHaveBeenCalledWith(
        'https://coingeko.burjx.com/coin-prices-all?currency=eur&page=2&pageSize=20'
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle API errors', async () => {
      // Setup mock for error response
      setupFetchMock({}, 500);

      // Call the function and expect it to throw
      await expect(fetchCoinData()).rejects.toThrow('API request failed with status 500');
    });

    it('should handle network errors', async () => {
      // Setup mock for network error
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      // Call the function and expect it to throw
      await expect(fetchCoinData()).rejects.toThrow('Network error');
    });
  });

  describe('fetchFeaturedCoins', () => {
    it('should fetch featured coins with default parameters', async () => {
      // Mock data
      const mockCoins: CoinData[] = [
        {
          productId: 1,
          id: 'bitcoin',
          name: 'Bitcoin',
          image: 'bitcoin.png',
          currentPrice: 50000,
          priceChangePercentage24h: 5,
          sparkline: [49000, 50000, 51000],
          marketCap: 1000000000000,
          tradingVolume: 50000000000,
          symbol: 'BTC'
        }
      ];
      const mockResponse: CoinResponse = {
        data: mockCoins,
        page: 1,
        pageSize: 5,
        totalItems: 100,
        totalPages: 20
      };

      // Setup mock
      setupFetchMock(mockResponse);

      // Call the function
      const result = await fetchFeaturedCoins();

      // Assertions
      expect(global.fetch).toHaveBeenCalledWith(
        'https://coingeko.burjx.com/coin-prices-all?currency=usd&page=1&pageSize=5'
      );
      expect(result).toEqual(mockCoins);
    });

    it('should handle errors', async () => {
      // Setup mock for error
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      // Call the function and expect it to throw
      await expect(fetchFeaturedCoins()).rejects.toThrow('Network error');
    });
  });

  describe('fetchTopGainers', () => {
    it('should fetch and sort top gainers', async () => {
      // Mock data with unsorted coins
      const mockCoins: CoinData[] = [
        {
          productId: 1,
          id: 'bitcoin',
          name: 'Bitcoin',
          image: 'bitcoin.png',
          currentPrice: 50000,
          priceChangePercentage24h: 5,
          sparkline: [49000, 50000, 51000],
          marketCap: 1000000000000,
          tradingVolume: 50000000000,
          symbol: 'BTC'
        },
        {
          productId: 2,
          id: 'ethereum',
          name: 'Ethereum',
          image: 'ethereum.png',
          currentPrice: 3000,
          priceChangePercentage24h: 10,
          sparkline: [2900, 3000, 3100],
          marketCap: 300000000000,
          tradingVolume: 20000000000,
          symbol: 'ETH'
        },
        {
          productId: 3,
          id: 'cardano',
          name: 'Cardano',
          image: 'cardano.png',
          currentPrice: 2,
          priceChangePercentage24h: 15,
          sparkline: [1.9, 2, 2.1],
          marketCap: 60000000000,
          tradingVolume: 5000000000,
          symbol: 'ADA'
        }
      ];
      const mockResponse: CoinResponse = {
        data: mockCoins,
        page: 1,
        pageSize: 20,
        totalItems: 100,
        totalPages: 5
      };

      // Setup mock
      setupFetchMock(mockResponse);

      // Call the function with limit 2
      const result = await fetchTopGainers('usd', 2);

      // Assertions
      expect(global.fetch).toHaveBeenCalledWith(
        'https://coingeko.burjx.com/coin-prices-all?currency=usd&page=1&pageSize=20'
      );
      // Should return top 2 gainers sorted by priceChangePercentage24h in descending order
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('cardano'); // 15% change
      expect(result[1].id).toBe('ethereum'); // 10% change
    });

    it('should handle errors', async () => {
      // Setup mock for error
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      // Call the function and expect it to throw
      await expect(fetchTopGainers()).rejects.toThrow('Network error');
    });
  });

  describe('fetchTopLosers', () => {
    it('should fetch and sort top losers', async () => {
      // Mock data with unsorted coins
      const mockCoins: CoinData[] = [
        {
          productId: 1,
          id: 'bitcoin',
          name: 'Bitcoin',
          image: 'bitcoin.png',
          currentPrice: 50000,
          priceChangePercentage24h: -5,
          sparkline: [49000, 50000, 51000],
          marketCap: 1000000000000,
          tradingVolume: 50000000000,
          symbol: 'BTC'
        },
        {
          productId: 2,
          id: 'ethereum',
          name: 'Ethereum',
          image: 'ethereum.png',
          currentPrice: 3000,
          priceChangePercentage24h: -10,
          sparkline: [2900, 3000, 3100],
          marketCap: 300000000000,
          tradingVolume: 20000000000,
          symbol: 'ETH'
        },
        {
          productId: 3,
          id: 'cardano',
          name: 'Cardano',
          image: 'cardano.png',
          currentPrice: 2,
          priceChangePercentage24h: -15,
          sparkline: [1.9, 2, 2.1],
          marketCap: 60000000000,
          tradingVolume: 5000000000,
          symbol: 'ADA'
        }
      ];
      const mockResponse: CoinResponse = {
        data: mockCoins,
        page: 1,
        pageSize: 20,
        totalItems: 100,
        totalPages: 5
      };

      // Setup mock
      setupFetchMock(mockResponse);

      // Call the function with limit 2
      const result = await fetchTopLosers('usd', 2);

      // Assertions
      expect(global.fetch).toHaveBeenCalledWith(
        'https://coingeko.burjx.com/coin-prices-all?currency=usd&page=1&pageSize=20'
      );
      // Should return top 2 losers sorted by priceChangePercentage24h in ascending order
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('cardano'); // -15% change
      expect(result[1].id).toBe('ethereum'); // -10% change
    });

    it('should handle errors', async () => {
      // Setup mock for error
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      // Call the function and expect it to throw
      await expect(fetchTopLosers()).rejects.toThrow('Network error');
    });
  });

  describe('fetchCoinOHLC', () => {
    it('should fetch OHLC data for a specific coin', async () => {
      // Mock data
      const mockOHLCData: OHLCData[] = [
        {
          date: 1625097600000,
          usd: {
            open: 35000,
            high: 36000,
            low: 34000,
            close: 35500
          },
          aed: {
            open: 128450,
            high: 132120,
            low: 124780,
            close: 130285
          }
        }
      ];

      // Setup mock
      setupFetchMock(mockOHLCData);

      // Call the function
      const result = await fetchCoinOHLC(1, 7);

      // Assertions
      expect(global.fetch).toHaveBeenCalledWith(
        'https://coingeko.burjx.com/coin-ohlc?productId=1&days=7'
      );
      expect(result).toEqual(mockOHLCData);
    });

    it('should handle API errors', async () => {
      // Setup mock for error response
      setupFetchMock({}, 500);

      // Call the function and expect it to throw
      await expect(fetchCoinOHLC(1)).rejects.toThrow('API request failed with status 500');
    });

    it('should handle network errors', async () => {
      // Setup mock for network error
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      // Call the function and expect it to throw
      await expect(fetchCoinOHLC(1)).rejects.toThrow('Network error');
    });
  });
});