import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Typography } from './Typography';
import { COLORS, SIZES } from '../constants/theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'gold';
  style?: StyleProp<ViewStyle>;
}

export function Button({ title, variant = 'primary', style, ...props }: ButtonProps) {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'gold': return COLORS.gold;
      case 'secondary': return 'transparent';
      case 'primary':
      default: return COLORS.primary;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'secondary': return COLORS.white; // Assuming secondary is used on dark bg
      case 'gold': return COLORS.primary;
      case 'primary':
      default: return COLORS.white;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        variant === 'secondary' && styles.secondaryButton,
        style,
      ]}
      activeOpacity={0.8}
      {...props}
    >
      <Typography 
        variant="bodyMedium" 
        color={getTextColor()}
        align="center"
      >
        {title}
      </Typography>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    width: '100%',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
});
