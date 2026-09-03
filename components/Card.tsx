import React from 'react';
import { View, ViewProps, StyleSheet, StyleProp, ViewStyle, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

export interface CardProps extends ViewProps {
  variant?: 'default' | 'white' | 'hero' | 'primary' | 'list' | 'insight' | 'interactive';
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function Card({ variant = 'default', onPress, style, children, ...props }: CardProps) {
  const isInteractive = Boolean(onPress) || variant === 'interactive';

  const containerStyle = [
    styles.card,
    (variant === 'default' || variant === 'white') && styles.defaultCard,
    (variant === 'hero' || variant === 'primary') && styles.heroCard,
    variant === 'list' && styles.listCard,
    variant === 'insight' && styles.insightCard,
    style,
  ];

  if (isInteractive) {
    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={onPress}
        activeOpacity={0.75}
        {...(props as TouchableOpacityProps)}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={containerStyle} {...props}>
      {children}
    </View>
  );
}

export const AppCard = Card;

const styles = StyleSheet.create({
  card: {
    borderRadius: SIZES.cardRadius,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20,
    ...SHADOWS.soft,
  },
  defaultCard: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
  },
  heroCard: {
    backgroundColor: COLORS.primary,
    borderColor: 'transparent',
    borderRadius: SIZES.heroRadius,
    padding: SIZES.padding,
    ...SHADOWS.medium,
  },
  listCard: {
    padding: 0,
    overflow: 'hidden',
  },
  insightCard: {
    padding: 16,
  },
});
