import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Check, Dot } from 'lucide-react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

export type StepStatus = 'pending' | 'active' | 'completed';

interface FetchingStepItemProps {
  label: string;
  status: StepStatus;
  detail?: string;
  isLast?: boolean;
}

export function FetchingStepItem({ label, status, detail, isLast = false }: FetchingStepItemProps) {
  const isCompleted = status === 'completed';
  const isActive = status === 'active';
  const isPending = status === 'pending';

  return (
    <View style={styles.container}>
      <View style={styles.iconColumn}>
        <View
          style={[
            styles.circle,
            isCompleted && styles.circleCompleted,
            isActive && styles.circleActive,
            isPending && styles.circlePending,
          ]}
        >
          {isCompleted && <Check size={14} color="#FFFFFF" strokeWidth={2.6} />}
          {isActive && <ActivityIndicator size="small" color={COLORS.gold} />}
          {isPending && <Dot size={16} color={COLORS.textMuted} />}
        </View>

        {!isLast && (
          <View
            style={[
              styles.timelineLine,
              isCompleted && styles.timelineCompleted,
            ]}
          />
        )}
      </View>

      <View style={styles.textColumn}>
        <Text
          style={[
            styles.label,
            isCompleted && styles.labelCompleted,
            isActive && styles.labelActive,
            isPending && styles.labelPending,
          ]}
        >
          {label}
        </Text>
        {detail ? <Text style={styles.detail}>{detail}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    minHeight: 52,
  },
  iconColumn: {
    alignItems: 'center',
    width: 28,
    marginRight: 14,
  },
  circle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
  },
  circleCompleted: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  circleActive: {
    backgroundColor: '#FCFAF5',
    borderColor: COLORS.gold,
  },
  circlePending: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
  },
  timelineLine: {
    width: 1.5,
    flex: 1,
    backgroundColor: COLORS.border,
    marginVertical: 4,
  },
  timelineCompleted: {
    backgroundColor: '#DCFCE7',
  },
  textColumn: {
    flex: 1,
    paddingTop: 3,
    paddingBottom: 16,
  },
  label: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 15,
  },
  labelCompleted: {
    color: COLORS.primary,
    fontFamily: FONTS.bodySemiBold,
  },
  labelActive: {
    color: COLORS.primary,
    fontFamily: FONTS.bodySemiBold,
  },
  labelPending: {
    color: COLORS.textMuted,
  },
  detail: {
    fontFamily: FONTS.body,
    fontSize: 12.5,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});
