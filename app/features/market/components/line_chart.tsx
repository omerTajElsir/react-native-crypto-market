import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

interface LineChartProps {
  data: number[];
  width?: number;
  height?: number;
  color: string;
  withGradient?: boolean;
  priceChangePercentage24h?: number;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  width = 100,
  height = 50,
  color,
  withGradient = false,
  priceChangePercentage24h,
}) => {
  if (!data || data.length === 0) {
    return <View style={{ width, height }} />;
  }

  // Find min and max values to normalize the data
  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);
  const range = maxValue - minValue;

  // Normalize data to fit within the chart height
  const normalizedData = data.map((value) => {
    if (range === 0) return height / 2; // If all values are the same, draw a straight line
    return height - ((value - minValue) / range) * height;
  });

  // Calculate points for the path
  const points = normalizedData.map((y, i) => {
    const x = (i / (data.length - 1)) * width;
    return `${x},${y}`;
  });

  // Create the path
  const path = `M${points.join(' L')}`;

  // Create the filled path (for gradient)
  const filledPath = `${path} L${width},${height} L0,${height} Z`;

  const gradientId = 'chartGradient';

  return (
    <View style={{ width, height }}>

      <Svg width={width} height={height}>
        {withGradient && (
          <Defs>
            <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={color} stopOpacity="0.5" />
              <Stop offset="1" stopColor={color} stopOpacity="0.1" />
            </LinearGradient>
          </Defs>
        )}

        {/* Filled area with gradient */}
        {withGradient && (
          <Path
            d={filledPath}
            fill={`url(#${gradientId})`}
            strokeWidth={0}
          />
        )}

        {/* Line */}
        <Path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={2}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  priceChangeContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#4A4A4A',
    borderRadius: 8,
    padding: 4,
    zIndex: 1,
  },
  priceChangeText: {
    fontSize: 10,
    fontWeight: 'bold',
  }
});

export default LineChart;
