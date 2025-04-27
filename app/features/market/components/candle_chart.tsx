import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, } from 'react-native';
import { Svg, Line, Rect, Text as SvgText } from 'react-native-svg';
import { OHLCData } from '@/app/features/market/services/api';

interface CandleChartProps {
  data: OHLCData[];
  width?: number;
  height?: number;
  currency?: 'usd' | 'aed';
  currentPrice?: number;
  selectedInterval?: number | 'max';
  onIntervalChange?: (interval: number | 'max') => void;
}

const CandleChart: React.FC<CandleChartProps> = ({
  data,
  width = Dimensions.get('window').width - 32,
  height = 300,
  currency = 'usd',
  currentPrice,
  selectedInterval = 1,
  onIntervalChange,
}) => {

  if (!data || data.length === 0) {
    return (
      <View style={[styles.container, { width, height }]}>
        <Text style={styles.noDataText}>No data available</Text>
      </View>
    );
  }

  // Extract OHLC values for the selected currency
  const ohlcValues = data.map(item => item[currency]);

  // Find min and max values to normalize the data
  const minValue = Math.min(...ohlcValues.map(item => item.low));
  const maxValue = Math.max(...ohlcValues.map(item => item.high));
  const range = maxValue - minValue;

  // Calculate chart dimensions
  const chartWidth = width - 60; // Leave space for y-axis labels
  const chartHeight = height - 60; // Leave space for x-axis labels and interval selector
  const chartStartX = 10; // Left margin
  const chartEndX = width - 50; // Right margin for y-axis
  const candleWidth = Math.max(2, ((chartEndX - chartStartX) / data.length) - 2); // Ensure candles are at least 2px wide

  // Function to normalize a value to fit within the chart height
  const normalizeValue = (value: number) => {
    if (range === 0) return chartHeight / 2;
    return chartHeight - ((value - minValue) / range) * chartHeight;
  };

  // Format price for display
  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return price.toLocaleString();
    } else if (price >= 1) {
      return price.toFixed(2);
    } else {
      return price.toFixed(6);
    }
  };

  // Generate y-axis labels
  const yAxisLabels = [];
  const numLabels = 5;
  for (let i = 0; i < numLabels; i++) {
    const value = minValue + (range * i) / (numLabels - 1);
    yAxisLabels.push({
      value,
      y: normalizeValue(value),
    });
  }

  // Highlight current price if provided
  const currentPriceY = currentPrice !== undefined ? normalizeValue(currentPrice) : null;

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <Svg width={width} height={chartHeight}>
          {/* Y-axis labels */}
          {yAxisLabels.map((label, index) => (
            <React.Fragment key={`y-label-${index}`}>
              <SvgText
                x={width - 10}
                y={label.y + 4}
                fontSize={10}
                fill="#CCCCCC"
                textAnchor="end"

              >
                {formatPrice(label.value)}
              </SvgText>
              <Line
                x1={chartStartX}
                y1={label.y}
                x2={chartEndX}
                y2={label.y}
                stroke="#444444"
                strokeWidth={0.5}
              />
            </React.Fragment>
          ))}

          {/* Current price highlight */}
          {currentPriceY && (
            <>
              {/* Current price card */}
              <Rect
                x={chartEndX - 12}
                y={currentPriceY - 10}
                width={54}
                height={20}
                fill="#CDFF00"
                rx={5}
                ry={5}
              />
              <Line
                x1={chartStartX}
                y1={currentPriceY}
                x2={chartEndX}
                y2={currentPriceY}
                stroke="#CDFF00"
                strokeWidth={1}
                strokeDasharray="3,3"
              />
              <SvgText
                x={chartEndX}
                y={currentPriceY + 4}
                fontSize={10}
                fill="#000000"
              >
                ${formatPrice(currentPrice??0)}
              </SvgText>
            </>
          )}

          {/* Candles */}
          {data.map((item, index) => {
            const ohlc = item[currency];
            const x = chartStartX + (index * (chartEndX - chartStartX)) / data.length;
            const open = normalizeValue(ohlc.open);
            const high = normalizeValue(ohlc.high);
            const low = normalizeValue(ohlc.low);
            const close = normalizeValue(ohlc.close);
            const isPositive = ohlc.close >= ohlc.open;
            const candleColor = isPositive ? '#CDFF00' : '#FF3440';
            const bodyTop = isPositive ? close : open;
            const bodyHeight = Math.abs(open - close);

            return (
              <React.Fragment key={`candle-${index}`}>
                {/* Wick (high to low) */}
                <Line
                  x1={x + candleWidth / 2}
                  y1={high}
                  x2={x + candleWidth / 2}
                  y2={low}
                  stroke={candleColor}
                  strokeWidth={1}
                />

                {/* Body (open to close) */}
                <Rect
                  x={x}
                  y={bodyTop}
                  width={candleWidth}
                  height={Math.max(1, bodyHeight)} // Ensure body is at least 1px high
                  fill={candleColor}
                />
              </React.Fragment>
            );
          })}
        </Svg>
      </View>

      {/* Interval selector */}
      <View style={styles.intervalSelector}>
        {([1, 7, 30, 365, 'max'] as Array<number | 'max'>).map((interval) => (
          <TouchableOpacity
            key={`interval-${interval}`}
            style={[
              styles.intervalButton,
              selectedInterval === interval ? styles.selectedIntervalButton : undefined,
            ]}
            onPress={() => onIntervalChange ? onIntervalChange(interval) : undefined}
          >
            <Text
              style={[
                styles.intervalButtonText,
                selectedInterval === interval ? styles.selectedIntervalButtonText : undefined,
              ]}
            >
              {interval === 'max' ? 'MAX' : `${interval}D`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  chartContainer: {
    marginBottom: 16,
  },
  noDataText: {
    color: '#CCCCCC',
    textAlign: 'center',
    marginTop: 20,
  },
  intervalSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  intervalButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#2B2B2B',
  },
  selectedIntervalButton: {
    backgroundColor: '#CDFF00',
  },
  intervalButtonText: {
    color: '#FFFFFF',
    fontFamily: 'LufgaMedium',
    fontSize: 14,
  },
  selectedIntervalButtonText: {
    color: '#000000',
  },
});

export default CandleChart;
