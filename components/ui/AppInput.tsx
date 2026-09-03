import React from 'react';
import { View, TextInput, TextInputProps, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { Search } from 'lucide-react-native';

export interface AppInputProps extends TextInputProps {
  icon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

export function AppInput({
  icon,
  containerStyle,
  style,
  placeholderTextColor = COLORS.textSecondary,
  ...props
}: AppInputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {icon ? icon : <Search color={COLORS.textSecondary} size={18} strokeWidth={1.8} />}
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={placeholderTextColor}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    paddingHorizontal: 16,
    height: 48,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontFamily: FONTS.body,
    fontSize: 15,
    color: COLORS.text,
  },
});
