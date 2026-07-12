import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { FONTS, COLORS } from '../constants/theme';

interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'bodyMedium' | 'bodyBold' | 'caption';
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export function Typography({
  variant = 'body',
  color = COLORS.text,
  align = 'left',
  style,
  children,
  ...props
}: TypographyProps) {
  return (
    <Text
      style={[
        styles[variant],
        { color, textAlign: align },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontFamily: FONTS.heading,
    fontSize: 48,
    lineHeight: 56,
  },
  h2: {
    fontFamily: FONTS.heading,
    fontSize: 32,
    lineHeight: 40,
  },
  h3: {
    fontFamily: FONTS.bodyBold,
    fontSize: 24,
    lineHeight: 32,
  },
  body: {
    fontFamily: FONTS.body,
    fontSize: 16,
    lineHeight: 24,
  },
  bodyMedium: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 16,
    lineHeight: 24,
  },
  bodyBold: {
    fontFamily: FONTS.bodyBold,
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontFamily: FONTS.body,
    fontSize: 13,
    lineHeight: 18,
  },
});
