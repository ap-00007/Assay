import { Platform } from 'react-native';

export const COLORS = {
  primary: '#111827',       // Deep Navy
  background: '#F7F7F5',    // Warm Off-White
  surface: '#FFFFFF',       // White
  gold: '#D6A928',          // Assay Gold
  text: '#111827',          // Deep Navy primary text
  textSecondary: '#6B7280', // Secondary Text
  textMuted: '#6B7280',     // Metadata & Secondary labels
  border: '#E7E7E3',        // Border & Dividers
  white: '#FFFFFF',

  // Semantic Colors
  success: '#16A34A',
  warning: '#D97706',
  error: '#DC2626',
  info: '#2563EB',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  huge: 48,
};

export const SIZES = {
  padding: 24,
  radius: 16,
  cardRadius: 20,
  heroRadius: 24,
  smallRadius: 12,
  bottomNavRadius: 28,
  largeRadius: 24,
};

// Font family definitions according to Assay Typography System
// Editorial Serif: Antic Didone
// Primary UI Font: Avenir Next / DM Sans
export const FONTS = {
  heading: 'AnticDidone_400Regular',
  body: 'DMSans_400Regular',
  bodyMedium: 'DMSans_500Medium',
  bodySemiBold: 'DMSans_600SemiBold',
  bodyBold: 'DMSans_700Bold',
};

export const SHADOWS = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  soft: {
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  medium: {
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
};
