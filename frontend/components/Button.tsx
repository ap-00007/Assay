import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet, ViewStyle, StyleProp, ActivityIndicator } from 'react-native';
import { Typography } from './Typography';
import { COLORS, SIZES, FONTS } from '../constants/theme';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function Button({ 
  title, 
  variant = 'primary', 
  size = 'md',
  loading = false,
  icon,
  style, 
  disabled,
  ...props 
}: ButtonProps) {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isGold = variant === 'gold' || variant === 'accent';

  const getBackgroundColor = () => {
    if (disabled) return COLORS.border;
    if (isGold) return COLORS.gold;
    if (isSecondary) return COLORS.surface;
    return COLORS.primary;
  };

  const getTextColor = () => {
    if (disabled) return COLORS.textMuted;
    if (isGold) return COLORS.primary;
    if (isSecondary) return COLORS.primary;
    return COLORS.white;
  };

  const getHeight = () => {
    switch (size) {
      case 'sm': return 40;
      case 'lg': return 56;
      case 'md':
      default: return 50;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { 
          backgroundColor: getBackgroundColor(),
          height: getHeight(),
          opacity: disabled ? 0.6 : 1,
        },
        isSecondary && styles.secondaryButton,
        style,
      ]}
      activeOpacity={0.7}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Typography 
            variant="bodyMedium" 
            color={getTextColor()}
            align="center"
            style={icon ? { marginLeft: 8 } : undefined}
          >
            {title}
          </Typography>
        </>
      )}
    </TouchableOpacity>
  );
}

export const AppButton = Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: COLORS.border,
  },
});
