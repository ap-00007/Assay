import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../components/Typography';
import { COLORS, FONTS, SIZES, SPACING } from '../../constants/theme';
import { Eye, EyeOff } from 'lucide-react-native';

export default function RegisterScreen() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <View style={styles.logoSection}>
            <View style={styles.logoMark}>
              <View style={[styles.bar, { height: 12, opacity: 0.5 }]} />
              <View style={[styles.bar, { height: 20, opacity: 0.75 }]} />
              <View style={[styles.bar, { height: 28 }]} />
              <View style={[styles.bar, { height: 20, opacity: 0.75 }]} />
              <View style={[styles.bar, { height: 14, opacity: 0.5 }]} />
            </View>
            <Typography variant="h2" color={COLORS.text} style={styles.brandName}>
              Welcome to FinCopilot
            </Typography>
            <Typography variant="secondary" color={COLORS.textSecondary}>
              Create your account to get started
            </Typography>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <FormField placeholder="Full Name" />
            <FormField placeholder="Email Address" keyboardType="email-address" />
            <FormField
              placeholder="Password"
              secureTextEntry={!showPassword}
              rightIcon={
                <TouchableOpacity onPress={() => setShowPassword((v) => !v)}>
                  {showPassword
                    ? <EyeOff color={COLORS.textSecondary} size={18} />
                    : <Eye color={COLORS.textSecondary} size={18} />
                  }
                </TouchableOpacity>
              }
            />
            <FormField placeholder="Confirm Password" secureTextEntry />

            {/* Terms */}
            <TouchableOpacity
              style={styles.termsRow}
              onPress={() => setAgreed((v) => !v)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
                {agreed && (
                  <Typography variant="caption" color={COLORS.white} style={styles.checkmark}>✓</Typography>
                )}
              </View>
              <Typography variant="secondary" color={COLORS.textSecondary} style={styles.termsText}>
                I agree to the{' '}
                <Typography variant="secondary" color={COLORS.gold}>Terms & Conditions</Typography>
              </Typography>
            </TouchableOpacity>
          </View>

          {/* CTA */}
          <View style={styles.ctaSection}>
            <TouchableOpacity
              style={[styles.createButton, !agreed && styles.buttonDisabled]}
              onPress={() => agreed && router.push('/financial-setup')}
              activeOpacity={agreed ? 0.85 : 1}
            >
              <Typography variant="bodyMedium" color={COLORS.white} style={styles.createText}>
                Create Account
              </Typography>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Typography variant="caption" color={COLORS.textSecondary} style={styles.orText}>
                or continue with
              </Typography>
              <View style={styles.dividerLine} />
            </View>

            {/* Social */}
            <View style={styles.socialRow}>
              {['🇬 Google', '🍎 Apple', '🟦 Microsoft'].map((label) => (
                <TouchableOpacity key={label} style={styles.socialButton} activeOpacity={0.75}>
                  <Typography variant="secondary" color={COLORS.text}>{label}</Typography>
                </TouchableOpacity>
              ))}
            </View>

            {/* Sign In */}
            <TouchableOpacity
              style={styles.signInRow}
              onPress={() => router.replace('/(tabs)')}
              activeOpacity={0.7}
            >
              <Typography variant="secondary" color={COLORS.textSecondary}>
                Already have an account?{' '}
              </Typography>
              <Typography variant="secondary" color={COLORS.gold} style={styles.signInText}>
                Sign In
              </Typography>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function FormField({
  placeholder,
  keyboardType,
  secureTextEntry,
  rightIcon,
}: {
  placeholder: string;
  keyboardType?: any;
  secureTextEntry?: boolean;
  rightIcon?: React.ReactNode;
}) {
  return (
    <View style={fieldStyles.wrapper}>
      <TextInput
        style={fieldStyles.input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textSecondary}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
      />
      {rightIcon && <View style={fieldStyles.rightIcon}>{rightIcon}</View>}
    </View>
  );
}

const fieldStyles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.base,
    height: 52,
  },
  input: {
    flex: 1,
    fontFamily: FONTS.body,
    fontSize: 15,
    color: COLORS.text,
  },
  rightIcon: {
    paddingLeft: SPACING.sm,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xxxl,
    gap: SPACING.xxl,
  },
  logoSection: {
    alignItems: 'center',
    gap: SPACING.sm,
    paddingTop: SPACING.lg,
  },
  logoMark: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    marginBottom: SPACING.md,
  },
  bar: {
    width: 8,
    backgroundColor: COLORS.gold,
    borderRadius: 2,
  },
  brandName: {
    fontSize: 24,
    textAlign: 'center',
  },
  form: {
    gap: SPACING.md,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginTop: SPACING.xs,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkmark: {
    fontSize: 11,
    fontFamily: FONTS.bodySemiBold,
  },
  termsText: {
    flex: 1,
    lineHeight: 20,
  },
  ctaSection: {
    gap: SPACING.base,
  },
  createButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.base + 2,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  createText: {
    fontSize: 16,
    fontFamily: FONTS.bodySemiBold,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  orText: {
    fontSize: 12,
  },
  socialRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  socialButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: SIZES.smallRadius,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
  },
  signInRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  signInText: {
    fontFamily: FONTS.bodySemiBold,
  },
});
