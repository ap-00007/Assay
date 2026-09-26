import React, { useState } from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewStyle,
  StyleProp,
  Platform,
} from 'react-native';
import { Eye, EyeOff, AlertCircle } from 'lucide-react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

export interface AuthInputProps extends TextInputProps {
  label: string;
  icon?: React.ReactNode;
  isPassword?: boolean;
  error?: string | null;
  containerStyle?: StyleProp<ViewStyle>;
  hint?: string;
}

export function AuthInput({
  label,
  icon,
  isPassword = false,
  error,
  containerStyle,
  hint,
  value,
  onChangeText,
  placeholder,
  ...props
}: AuthInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const hasError = !!error;

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        {hint ? <Text style={styles.hint}>{hint}</Text> : null}
      </View>

      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          hasError && styles.inputError,
        ]}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}

        <TextInput
          style={[
            styles.textInput,
            !icon && { paddingLeft: 16 },
            isPassword && { paddingRight: 40 },
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textMuted}
          secureTextEntry={isPassword && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoCapitalize={isPassword ? 'none' : props.autoCapitalize || 'none'}
          autoCorrect={false}
          {...props}
        />

        {isPassword && (
          <TouchableOpacity
            style={styles.rightAction}
            onPress={() => setShowPassword(!showPassword)}
            activeOpacity={0.7}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff size={19} color={COLORS.textSecondary} strokeWidth={1.8} />
            ) : (
              <Eye size={19} color={COLORS.textSecondary} strokeWidth={1.8} />
            )}
          </TouchableOpacity>
        )}
      </View>

      {hasError && (
        <View style={styles.errorContainer}>
          <AlertCircle size={14} color={COLORS.error} strokeWidth={2} style={styles.errorIcon} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
    width: '100%',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 13.5,
    color: COLORS.primary,
    letterSpacing: -0.1,
  },
  hint: {
    fontFamily: FONTS.body,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    height: 52,
    paddingHorizontal: 14,
    ...Platform.select({
      web: {
        transition: 'border-color 0.18s ease, box-shadow 0.18s ease',
      },
    }),
  },
  inputFocused: {
    borderColor: COLORS.primary,
    ...Platform.select({
      web: {
        boxShadow: '0 0 0 1px #111827',
      },
    }),
  },
  inputError: {
    borderColor: COLORS.error,
    backgroundColor: '#FEF2F2',
    ...Platform.select({
      web: {
        boxShadow: '0 0 0 1px #DC2626',
      },
    }),
  },
  iconContainer: {
    width: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontFamily: FONTS.body,
    fontSize: 15,
    color: COLORS.primary,
    paddingVertical: 0,
  },
  rightAction: {
    position: 'absolute',
    right: 14,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    paddingLeft: 2,
  },
  errorIcon: {
    marginRight: 6,
  },
  errorText: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 12.5,
    color: COLORS.error,
    flex: 1,
  },
});
