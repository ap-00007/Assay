import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Path, Text as SvgText } from 'react-native-svg';
import { COLORS, FONTS } from '../../constants/theme';

interface HealthScoreGaugeProps {
  score: number;
  size?: number;
  label?: string;
}

export function HealthScoreGauge({ score, size = 140, label = 'Healthy' }: HealthScoreGaugeProps) {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;

  // Arc: 240 degrees (from 150° to 390°/30°)
  const startAngle = 150;
  const sweepAngle = 240;
  const endAngle = startAngle + sweepAngle * (score / 100);

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const arcPath = (start: number, end: number, color: string, opacity = 1) => {
    const s = toRad(start);
    const e = toRad(end);
    const x1 = cx + radius * Math.cos(s);
    const y1 = cy + radius * Math.sin(s);
    const x2 = cx + radius * Math.cos(e);
    const y2 = cy + radius * Math.sin(e);
    const largeArc = end - start > 180 ? 1 : 0;
    return (
      <Path
        d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
        opacity={opacity}
      />
    );
  };

  const getScoreColor = () => {
    if (score >= 80) return COLORS.success;
    if (score >= 60) return COLORS.gold;
    if (score >= 40) return COLORS.warning;
    return COLORS.error;
  };

  const scoreColor = getScoreColor();

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* Track */}
        {arcPath(startAngle, startAngle + sweepAngle, COLORS.border, 0.6)}
        {/* Score arc */}
        {score > 0 && arcPath(startAngle, endAngle, scoreColor)}
        {/* Center score text */}
        <SvgText
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          fontSize={28}
          fontFamily={FONTS.bodyBold}
          fill={COLORS.text}
          fontWeight="700"
        >
          {score}
        </SvgText>
        <SvgText
          x={cx}
          y={cy + 16}
          textAnchor="middle"
          fontSize={11}
          fontFamily={FONTS.bodyMedium}
          fill={COLORS.textSecondary}
        >
          {label}
        </SvgText>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
