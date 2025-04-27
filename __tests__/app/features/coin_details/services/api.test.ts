import { 
  fetchCoinOHLC,
  OHLCData
} from '@/app/features/coin_details/services/api';

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

describe('Coin Details API Service', () => {
  describe('fetchCoinOHLC', () => {
    it('should fetch OHLC data for a specific coin with default days parameter', async () => {
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

      // Call the function with default days parameter (1)
      const result = await fetchCoinOHLC(1);

      // Assertions
      expect(global.fetch).toHaveBeenCalledWith(
        'https://coingeko.burjx.com/coin-ohlc?productId=1&days=1'
      );
      expect(result).toEqual(mockOHLCData);
    });

    it('should fetch OHLC data for a specific coin with custom days parameter', async () => {
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
        },
        {
          date: 1625184000000,
          usd: {
            open: 35500,
            high: 36500,
            low: 35000,
            close: 36000
          },
          aed: {
            open: 130285,
            high: 133955,
            low: 128450,
            close: 132120
          }
        }
      ];

      // Setup mock
      setupFetchMock(mockOHLCData);

      // Call the function with custom days parameter (7)
      const result = await fetchCoinOHLC(1, 7);

      // Assertions
      expect(global.fetch).toHaveBeenCalledWith(
        'https://coingeko.burjx.com/coin-ohlc?productId=1&days=7'
      );
      expect(result).toEqual(mockOHLCData);
    });

    it('should fetch OHLC data for a specific coin with "max" days parameter', async () => {
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
        },
        {
          date: 1625184000000,
          usd: {
            open: 35500,
            high: 36500,
            low: 35000,
            close: 36000
          },
          aed: {
            open: 130285,
            high: 133955,
            low: 128450,
            close: 132120
          }
        }
      ];

      // Setup mock
      setupFetchMock(mockOHLCData);

      // Call the function with "max" days parameter
      const result = await fetchCoinOHLC(1, 'max');

      // Assertions
      expect(global.fetch).toHaveBeenCalledWith(
        'https://coingeko.burjx.com/coin-ohlc?productId=1&days=max'
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