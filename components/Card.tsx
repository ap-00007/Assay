import React from 'react';
import { View, ViewProps, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

interface CardProps extends ViewProps {
  variant?: 'primary' | 'white' | 'glass';
  style?: StyleProp<ViewStyle>;
}

export function Card({ variant = 'white', style, children, ...props }: CardProps) {
  return (
    <View
      style={[
        styles.card,
        variant === 'white' && styles.whiteCard,
        variant === 'primary' && styles.primaryCard,
        variant === 'glass' && styles.glassCard,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: SIZES.largeRadius,
    padding: SIZES.padding,
    ...SHADOWS.soft,
  },
  whiteCard: {
    backgroundColor: COLORS.white,
  },
  primaryCard: {
    backgroundColor: COLORS.primary,
  },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
  },
});
