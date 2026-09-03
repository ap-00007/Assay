import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Typography } from '../Typography';
import { COLORS } from '../../constants/theme';

export interface AppChipProps extends TouchableOpacityProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function AppChip({
  label,
  active = false,
  onPress,
  style,
  ...props
}: AppChipProps) {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        active ? styles.activeChip : styles.inactiveChip,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      {...props}
    >
      <Typography
        variant="caption"
        color={active ? COLORS.white : COLORS.text}
        style={styles.label}
      >
        {label}
      </Typography>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveChip: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
  },
  activeChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  label: {
    fontSize: 13,
  },
});
