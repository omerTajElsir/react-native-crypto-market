import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, SafeAreaView, ScrollView, ImageBackground } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CoinData, OHLCData, fetchCoinOHLC } from '@/app/features/coin_details/services/api';
import CandleChart from '@/app/features/coin_details/components/candle_chart';
import chartBgImage from '@/assets/images/chart_bg.png';

const CoinDetailsScreen = () => {
  const router = useRouter();
  const { coin: coinParam } = useLocalSearchParams();
  const [coin, setCoin] = useState<CoinData | null>(null);
  const [ohlcData, setOhlcData] = useState<OHLCData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedInterval, setSelectedInterval] = useState<number | 'max'>(1);

  useEffect(() => {
    // Parse the coin data from the URL parameter
    if (coinParam) {
      try {
        const parsedCoin = JSON.parse(decodeURIComponent(coinParam as string));
        setCoin(parsedCoin);

        // Fetch OHLC data
        fetchOHLCData(parsedCoin.productId, selectedInterval);
      } catch (err) {
        console.error('Error parsing coin data:', err);
        setError('Failed to load coin details. Please try again.');
        setLoading(false);
      }
    } else {
      setError('No coin data provided.');
      setLoading(false);
    }
  }, [coinParam]);

  // Fetch OHLC data when interval changes
  useEffect(() => {
    if (coin) {
      fetchOHLCData(coin.productId, selectedInterval);
    }
  }, [selectedInterval]);

  const fetchOHLCData = async (productId: number, days: number | 'max') => {
    try {
      setLoading(true);
      const data = await fetchCoinOHLC(productId, days);
      setOhlcData(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching OHLC data:', err);
      setError('Failed to load chart data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleIntervalChange = (interval: number | 'max') => {
    setSelectedInterval(interval);
  };

  const handleBack = () => {
    router.back();
  };

  if (!coin) {
    return (
      <ImageBackground source={chartBgImage} style={styles.backgroundImage} resizeMode="cover">
        <SafeAreaView style={styles.container}>
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Text style={styles.backButtonText}>Go Back</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#CDFF00" />
              <Text style={styles.loadingText}>Loading coin details...</Text>
            </View>
          )}
        </SafeAreaView>
      </ImageBackground>
    );
  }

  return (
      <ImageBackground source={chartBgImage} style={styles.backgroundImage} resizeMode="cover">
        <SafeAreaView style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={[styles.backButton]}>
              <Ionicons name="arrow-back" size={18} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.titleWrapper}>
              <View style={styles.titleContainer}>
                <Image source={{ uri: coin.image }} style={styles.coinIcon} />
                <Text style={styles.title}>{coin.name} ({coin.symbol.toUpperCase()})</Text>
              </View>
            </View>
            <View style={{width:32}}></View>
          </View>

          <ScrollView style={styles.scrollContainer}>
            {/* Price and Change */}
            <View style={styles.priceContainer}>
              <Text style={styles.price}>${coin.currentPrice.toLocaleString()}</Text>

            </View>

            <View style={[
              styles.changeContainer,
            ]}>
              <Text style={[
                styles.changeText,
                { color: coin.priceChangePercentage24h >= 0 ? '#CDFF00' : '#FF3440' }
              ]}>
                {coin.priceChangePercentage24h >= 0 ? '+' : ''}
                {coin.priceChangePercentage24h.toFixed(2)}%
              </Text>
            </View>

            {/* Chart */}
            <View style={styles.chartContainer}>
              {loading ? (
                  <View style={styles.chartLoadingContainer}>
                    <ActivityIndicator size="large" color="#CDFF00" />
                    <Text style={styles.loadingText}>Loading chart data...</Text>
                  </View>
              ) : error ? (
                  <View style={styles.chartErrorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity
                        style={styles.retryButton}
                        onPress={() => fetchOHLCData(coin.productId, selectedInterval)}
                    >
                      <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                  </View>
              ) : (
                  <>
                    <CandleChart
                        data={ohlcData}
                        currentPrice={coin.currentPrice}
                        onIntervalChange={handleIntervalChange}
                        selectedInterval={selectedInterval}
                    />
                  </>
              )}
            </View>

            {/* Additional Info (can be expanded in the future) */}
            <View style={styles.infoContainer}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Market Cap</Text>
                <Text style={styles.infoValue}>${coin.marketCap.toLocaleString()}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>24h Trading Volume</Text>
                <Text style={styles.infoValue}>${coin.tradingVolume.toLocaleString()}</Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
      );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: '#0E0E0E',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2B2B2B',
    marginTop: 62,
  },
  backButton: {
    padding: 8,
    borderRadius: 24,
    backgroundColor: '#2B2B2B',
    width: 48, height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  coinIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontFamily: 'LufgaBold',
    color: '#FFFFFF',
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 28,
    fontFamily: 'LufgaBold',
    color: '#FFFFFF',
    marginRight: 12,
  },
  changeContainer: {
    backgroundColor: '#FFFFFF0D',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start'
  },
  changeText: {
    fontSize: 16,
    fontFamily: 'LufgaBold',
  },
  chartContainer: {
    marginVertical: 16,
    borderRadius: 16,
    padding: 16,
    minHeight: 300,
    overflow: 'hidden',
  },
  chartLoadingContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartErrorContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#CCCCCC',
    marginTop: 12,
    fontFamily: 'LufgaRegular',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'LufgaRegular',
  },
  retryButton: {
    backgroundColor: '#CDFF00',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  retryButtonText: {
    color: '#000000',
    fontFamily: 'LufgaBold',
  },
  backButtonText: {
    color: '#CDFF00',
    fontFamily: 'LufgaBold',
  },
  infoContainer: {
    backgroundColor: 'transparent',
    borderRadius: 16,
    padding: 16,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: 'rgba(207,192,192,0.43)',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  infoLabel: {
    color: '#CCCCCC',
    fontFamily: 'LufgaRegular',
    fontSize: 14,
  },
  infoValue: {
    color: '#FFFFFF',
    fontFamily: 'LufgaBold',
    fontSize: 14,
  },
  titleWrapper: {
    flex: 1,
    alignItems: 'center',
  },
});

export default CoinDetailsScreen;