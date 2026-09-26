import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { Typography } from '../Typography';
import { COLORS, FONTS, SIZES, SPACING } from '../../constants/theme';

interface RecommendationCardProps {
  icon: string;
  title: string;
  subtitle: string;
  impact: string;
  impactColor?: string;
  onPress?: () => void;
}

export function RecommendationCard({
  icon,
  title,
  subtitle,
  impact,
  impactColor = COLORS.success,
  onPress,
}: RecommendationCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={styles.iconWrapper}>
        <Typography variant="body" style={styles.emoji}>{icon}</Typography>
      </View>

      <View style={styles.content}>
        <Typography variant="bodyMedium" style={styles.title}>{title}</Typography>
        <Typography variant="secondary" color={COLORS.textSecondary} style={styles.subtitle}>
          {subtitle}
        </Typography>
        <View style={[styles.impactBadge, { backgroundColor: impactColor + '15' }]}>
          <Typography variant="caption" color={impactColor} style={styles.impactText}>
            {impact}
          </Typography>
        </View>
      </View>

      <ChevronRight color={COLORS.textSecondary} size={18} strokeWidth={1.8} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.cardRadius,
    padding: SPACING.base,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.md,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 14,
    lineHeight: 20,
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 17,
  },
  impactBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
  },
  impactText: {
    fontSize: 11,
    fontFamily: FONTS.bodySemiBold,
  },
});
