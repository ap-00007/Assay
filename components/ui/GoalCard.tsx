import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '../Typography';
import { ProgressBar } from './ProgressBar';
import { COLORS, FONTS, SIZES, SPACING } from '../../constants/theme';

interface GoalCardProps {
  icon: string;
  name: string;
  color: string;
  current: number;
  target: number;
  percent: number;
  estimatedDate: string;
}

const fmt = (n: number) =>
  n >= 100000
    ? `₹${(n / 100000).toFixed(1)}L`
    : `₹${n.toLocaleString('en-IN')}`;

export function GoalCard({
  icon,
  name,
  color,
  current,
  target,
  percent,
  estimatedDate,
}: GoalCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.iconWrapper, { backgroundColor: color + '18' }]}>
          <Typography variant="body" style={styles.emoji}>{icon}</Typography>
        </View>
        <View style={styles.info}>
          <View style={styles.titleRow}>
            <Typography variant="bodyMedium" style={styles.name}>{name}</Typography>
            <Typography variant="caption" color={color} style={styles.percentText}>
              {percent}%
            </Typography>
          </View>
          <View style={styles.amountRow}>
            <Typography variant="caption" color={COLORS.textSecondary}>
              {fmt(current)} / {fmt(target)}
            </Typography>
            <Typography variant="caption" color={COLORS.textMuted}>
              Est. {estimatedDate}
            </Typography>
          </View>
        </View>
      </View>
      <View style={styles.progressWrapper}>
        <ProgressBar percent={percent} color={color} height={6} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.cardRadius,
    padding: SPACING.base,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 20,
  },
  info: {
    flex: 1,
    gap: 3,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 14,
  },
  percentText: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 13,
  },
  progressWrapper: {
    marginTop: 2,
  },
});
