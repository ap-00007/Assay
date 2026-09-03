import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { FONTS, COLORS } from '../constants/theme';

export interface TypographyProps extends TextProps {
  variant?: 
    | 'display'
    | 'pageTitle'
    | 'h1' 
    | 'h2' 
    | 'h3' 
    | 'cardHeading'
    | 'body' 
    | 'bodyMedium' 
    | 'bodySemiBold'
    | 'bodyBold' 
    | 'secondary'
    | 'caption'
    | 'navigation'
    | 'financial';
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
  display: {
    fontFamily: FONTS.bodyBold,
    fontSize: 42,
    lineHeight: 48,
    letterSpacing: -0.5,
  },
  pageTitle: {
    fontFamily: FONTS.heading,
    fontSize: 38,
    lineHeight: 46,
    letterSpacing: -0.3,
  },
  h1: {
    fontFamily: FONTS.heading,
    fontSize: 34,
    lineHeight: 42,
    letterSpacing: -0.3,
  },
  h2: {
    fontFamily: FONTS.heading,
    fontSize: 28,
    lineHeight: 36,
  },
  h3: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 24,
    lineHeight: 32,
  },
  cardHeading: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 19,
    lineHeight: 26,
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
  bodySemiBold: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 16,
    lineHeight: 24,
  },
  bodyBold: {
    fontFamily: FONTS.bodyBold,
    fontSize: 16,
    lineHeight: 24,
  },
  secondary: {
    fontFamily: FONTS.body,
    fontSize: 14,
    lineHeight: 20,
  },
  caption: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 13,
    lineHeight: 18,
  },
  navigation: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 12,
    lineHeight: 16,
  },
  financial: {
    fontFamily: FONTS.bodyBold,
    fontSize: 17,
    lineHeight: 22,
  },
});
