import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AlertCircle, X, WifiOff } from 'lucide-react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { AuthError } from '../../services/auth';

interface AuthErrorBannerProps {
  error: AuthError | null;
  onDismiss?: () => void;
}

export function AuthErrorBanner({ error, onDismiss }: AuthErrorBannerProps) {
  if (!error) return null;

  const isNetwork = error.type === 'network_error';

  return (
    <View style={styles.banner}>
      <View style={styles.iconWrapper}>
        {isNetwork ? (
          <WifiOff size={18} color={COLORS.error} strokeWidth={2} />
        ) : (
          <AlertCircle size={18} color={COLORS.error} strokeWidth={2} />
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          {error.type === 'account_exists' && 'Account Already Exists'}
          {error.type === 'incorrect_password' && 'Incorrect Password'}
          {error.type === 'invalid_email' && 'Invalid Email Address'}
          {error.type === 'network_error' && 'Network Connection Error'}
          {error.type === 'passwords_mismatch' && 'Password Mismatch'}
          {error.type === 'weak_password' && 'Password Too Short'}
          {error.type === 'empty_fields' && 'Required Information Missing'}
          {!error.type && 'Authentication Error'}
        </Text>
        <Text style={styles.message}>{error.message}</Text>
      </View>

      {onDismiss && (
        <TouchableOpacity
          onPress={onDismiss}
          style={styles.dismissButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityLabel="Dismiss error"
        >
          <X size={16} color={COLORS.textSecondary} strokeWidth={2} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: SIZES.radius,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 20,
  },
  iconWrapper: {
    marginRight: 10,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 13,
    color: '#991B1B',
    marginBottom: 2,
  },
  message: {
    fontFamily: FONTS.body,
    fontSize: 12.5,
    color: '#B91C1C',
    lineHeight: 18,
  },
  dismissButton: {
    padding: 2,
    marginLeft: 6,
  },
});
