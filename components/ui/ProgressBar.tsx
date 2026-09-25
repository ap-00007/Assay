import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

interface ProgressBarProps {
  percent: number;        // 0–100
  color?: string;
  trackColor?: string;
  height?: number;
  borderRadius?: number;
}

export function ProgressBar({
  percent,
  color = COLORS.gold,
  trackColor = COLORS.border,
  height = 6,
  borderRadius,
}: ProgressBarProps) {
  const clampedPercent = Math.min(100, Math.max(0, percent));
  const br = borderRadius ?? height / 2;

  return (
    <View
      style={[
        styles.track,
        { backgroundColor: trackColor, height, borderRadius: br },
      ]}
    >
      <View
        style={[
          styles.fill,
          {
            width: `${clampedPercent}%`,
            backgroundColor: color,
            height,
            borderRadius: br,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {},
});
