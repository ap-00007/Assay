import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Polyline, Line, Circle } from 'react-native-svg';
import { COLORS } from '../../constants/theme';

interface DataPoint {
  month: string;
  balance: number;
}

interface SparklineChartProps {
  data: DataPoint[];
  width?: number;
  height?: number;
  color?: string;
  showDot?: boolean;
}

export function SparklineChart({
  data,
  width = 200,
  height = 60,
  color = COLORS.gold,
  showDot = true,
}: SparklineChartProps) {
  if (!data || data.length < 2) return null;

  const padding = 8;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const values = data.map((d) => d.balance);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * chartWidth;
    const y = padding + chartHeight - ((d.balance - min) / range) * chartHeight;
    return `${x},${y}`;
  });

  const lastPoint = points[points.length - 1].split(',');
  const lastX = parseFloat(lastPoint[0]);
  const lastY = parseFloat(lastPoint[1]);

  return (
    <View style={styles.container}>
      <Svg width={width} height={height}>
        {/* Baseline */}
        <Line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke={COLORS.border}
          strokeWidth={1}
          strokeDasharray="3,3"
        />
        {/* Line */}
        <Polyline
          points={points.join(' ')}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Last dot */}
        {showDot && (
          <>
            <Circle cx={lastX} cy={lastY} r={5} fill={color} opacity={0.25} />
            <Circle cx={lastX} cy={lastY} r={3} fill={color} />
          </>
        )}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
