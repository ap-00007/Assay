import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '../Typography';
import { ProgressBar } from './ProgressBar';
import { COLORS, FONTS, SIZES, SPACING } from '../../constants/theme';

interface LoanCardProps {
  icon: string;
  name: string;
  outstandingAmount: number;
  emi: number;
  interestRate: number;
  dueDate: string;
  repaidPercent: number;
}

const fmt = (n: number) =>
  n >= 100000
    ? `₹${(n / 100000).toFixed(1)}L`
    : `₹${n.toLocaleString('en-IN')}`;

export function LoanCard({
  icon,
  name,
  outstandingAmount,
  emi,
  interestRate,
  dueDate,
  repaidPercent,
}: LoanCardProps) {
  const getColor = () => {
    if (name.toLowerCase().includes('credit')) return COLORS.error;
    if (name.toLowerCase().includes('car')) return COLORS.warning;
    return COLORS.info;
  };

  const color = getColor();

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.iconWrapper, { backgroundColor: color + '15' }]}>
          <Typography variant="body" style={styles.emoji}>{icon}</Typography>
        </View>
        <View style={styles.headerInfo}>
          <Typography variant="bodyMedium" style={styles.name}>{name}</Typography>
          <Typography variant="caption" color={COLORS.textSecondary}>
            EMI ₹{emi.toLocaleString('en-IN')} • {interestRate}% p.a.
          </Typography>
        </View>
        <View style={styles.outstanding}>
          <Typography variant="financial" color={COLORS.text} style={styles.amount}>
            {fmt(outstandingAmount)}
          </Typography>
          <Typography variant="caption" color={COLORS.textSecondary} style={styles.outstandingLabel}>
            outstanding
          </Typography>
        </View>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressLabels}>
          <Typography variant="caption" color={COLORS.textSecondary}>{repaidPercent}% repaid</Typography>
          <Typography variant="caption" color={COLORS.textSecondary}>{dueDate}</Typography>
        </View>
        <ProgressBar percent={repaidPercent} color={color} height={5} />
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
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 18,
  },
  headerInfo: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 14,
  },
  outstanding: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 15,
  },
  outstandingLabel: {
    fontSize: 10,
  },
  progressSection: {
    gap: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
