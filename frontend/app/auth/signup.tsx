import React, { useState, useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Mail, Lock, User as UserIcon, ArrowLeft, KeyRound, ShieldCheck } from 'lucide-react-native';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { AuthInput } from '../../components/auth/AuthInput';
import { PasswordStrengthIndicator } from '../../components/auth/PasswordStrengthIndicator';
import { AuthErrorBanner } from '../../components/auth/AuthErrorBanner';
import { COLORS, SIZES, SPACING, FONTS } from '../../constants/theme';
import {
  registerUser,
  validateEmail,
  evaluatePasswordStrength,
  AuthError,
  AuthErrorType,
} from '../../services/auth';
import { AAService } from '../../services/aaState';

export default function SignUpScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [generalError, setGeneralError] = useState<AuthError | null>(null);

  const passwordStrength = useMemo(() => evaluatePasswordStrength(password), [password]);

  const clearErrors = () => {
    setFieldErrors({});
    setGeneralError(null);
  };

  const handleSignUp = async (forcedError?: AuthErrorType) => {
    clearErrors();

    // Client side validations
    const errors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!name.trim() && !forcedError) {
      errors.name = 'Please enter your full name.';
    }

    if (!email.trim() && !forcedError) {
      errors.email = 'Please enter your email address.';
    } else if (email && !validateEmail(email) && !forcedError) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!password && !forcedError) {
      errors.password = 'Please create a password.';
    } else if (password && password.length < 8 && !forcedError) {
      errors.password = 'Password must be at least 8 characters long.';
    }

    if (!confirmPassword && !forcedError) {
      errors.confirmPassword = 'Please confirm your password.';
    } else if (password && confirmPassword && password !== confirmPassword && !forcedError) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);

    try {
      const result = await registerUser(name, email, password, confirmPassword, forcedError);

      if (result.error) {
        if (result.error.type === 'invalid_email') {
          setFieldErrors({ email: result.error.message });
        } else if (result.error.type === 'account_exists') {
          setFieldErrors({ email: result.error.message });
          setGeneralError(result.error);
        } else if (result.error.type === 'passwords_mismatch') {
          setFieldErrors({ confirmPassword: result.error.message });
          setGeneralError(result.error);
        } else {
          setGeneralError(result.error);
        }
      } else if (result.user) {
        // Check if user has already completed AA onboarding
        const state = AAService.getState();
        if (state.aa_onboarding_completed) {
          router.replace('/(tabs)');
        } else {
          router.replace('/connect');
        }
      }
    } catch (err) {
      setGeneralError({
        type: 'network_error',
        message: 'Unable to connect to ASSAY servers. Please check your network connection.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Top Header Navigation */}
          <View style={styles.topNav}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
              activeOpacity={0.7}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              accessibilityLabel="Go back"
            >
              <ArrowLeft size={22} color={COLORS.primary} strokeWidth={1.8} />
            </TouchableOpacity>

            <View style={styles.badgeContainer}>
              <ShieldCheck size={14} color={COLORS.gold} strokeWidth={2} />
              <Text style={styles.badgeText}>FINANCIAL PRIVACY FIRST</Text>
            </View>
          </View>

          {/* Main Editorial Header */}
          <View style={styles.headerSection}>
            <Typography variant="pageTitle" style={styles.pageTitle}>
              Create your ASSAY account.
            </Typography>
            <Typography variant="body" color={COLORS.textSecondary} style={styles.subtitle}>
              Turn transaction history into intelligent, actionable clarity.
            </Typography>
          </View>

          {/* General Error Banner */}
          <AuthErrorBanner
            error={generalError}
            onDismiss={() => setGeneralError(null)}
          />

          {/* Form Card */}
          <View style={styles.formCard}>
            <AuthInput
              label="Full Name"
              placeholder="e.g. Ashish Panda"
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: undefined }));
                if (generalError) setGeneralError(null);
              }}
              autoCapitalize="words"
              autoComplete="name"
              icon={<UserIcon size={18} color={COLORS.textSecondary} strokeWidth={1.8} />}
              error={fieldErrors.name}
            />

            <AuthInput
              label="Email"
              placeholder="name@example.com"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
                if (generalError) setGeneralError(null);
              }}
              keyboardType="email-address"
              autoComplete="email"
              icon={<Mail size={18} color={COLORS.textSecondary} strokeWidth={1.8} />}
              error={fieldErrors.email}
            />

            <AuthInput
              label="Password"
              placeholder="Create a strong password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: undefined }));
                if (generalError) setGeneralError(null);
              }}
              isPassword
              autoComplete="new-password"
              icon={<Lock size={18} color={COLORS.textSecondary} strokeWidth={1.8} />}
              error={fieldErrors.password}
            />

            {/* Subtle Password Strength Feedback */}
            <PasswordStrengthIndicator strength={passwordStrength} />

            <AuthInput
              label="Confirm Password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (fieldErrors.confirmPassword) {
                  setFieldErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                }
                if (generalError) setGeneralError(null);
              }}
              isPassword
              autoComplete="new-password"
              icon={<KeyRound size={18} color={COLORS.textSecondary} strokeWidth={1.8} />}
              error={fieldErrors.confirmPassword}
            />

            {/* CTA: Create Account */}
            <Button
              title="Create Account"
              variant="primary"
              size="lg"
              loading={loading}
              onPress={() => handleSignUp()}
              style={styles.createAccountButton}
            />
          </View>

          {/* Secondary Action */}
          <View style={styles.footerSecondary}>
            <Text style={styles.secondaryPrompt}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => router.push('/auth/login')}
              activeOpacity={0.7}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.secondaryLink}>Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* Interactive State Demo Pills */}
          <View style={styles.demoSection}>
            <Text style={styles.demoTitle}>TEST ERROR STATES</Text>
            <View style={styles.demoPillsRow}>
              <TouchableOpacity
                style={styles.demoPill}
                onPress={() => {
                  setName('Ashish Panda');
                  setEmail('existing@assay.finance');
                  setPassword('Password123#');
                  setConfirmPassword('Password123#');
                  handleSignUp('account_exists');
                }}
              >
                <Text style={styles.demoPillText}>Account Exists</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.demoPill}
                onPress={() => {
                  setName('Ashish Panda');
                  setEmail('invalid-email-address');
                  setPassword('Password123#');
                  setConfirmPassword('Password123#');
                  handleSignUp('invalid_email');
                }}
              >
                <Text style={styles.demoPillText}>Invalid Email</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.demoPill}
                onPress={() => {
                  setName('Ashish Panda');
                  setEmail('ashish@assay.finance');
                  setPassword('Password123#');
                  setConfirmPassword('DifferentPassword#');
                  handleSignUp('passwords_mismatch');
                }}
              >
                <Text style={styles.demoPillText}>Pass Mismatch</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.demoPill}
                onPress={() => {
                  setName('Ashish Panda');
                  setEmail('ashish@assay.finance');
                  setPassword('Password123#');
                  setConfirmPassword('Password123#');
                  handleSignUp('network_error');
                }}
              >
                <Text style={styles.demoPillText}>Network Error</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SIZES.padding,
    paddingTop: 12,
    paddingBottom: 40,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xxl,
    height: 44,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(214, 169, 40, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(214, 169, 40, 0.2)',
  },
  badgeText: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 10,
    color: '#927014',
    letterSpacing: 0.8,
  },
  headerSection: {
    marginBottom: SPACING.xxl,
  },
  pageTitle: {
    fontSize: 34,
    lineHeight: 42,
    color: COLORS.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.textSecondary,
  },
  formCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.cardRadius,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.xl,
    marginBottom: SPACING.xl,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 12px rgba(17, 24, 39, 0.03)',
      },
      default: {
        shadowColor: '#111827',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 1,
      },
    }),
  },
  createAccountButton: {
    height: 52,
    borderRadius: SIZES.radius,
    marginTop: 8,
  },
  footerSecondary: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  secondaryPrompt: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  secondaryLink: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 14,
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
  demoSection: {
    marginTop: SPACING.xxxl,
    paddingTop: SPACING.base,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  demoTitle: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 10.5,
    color: COLORS.textMuted,
    letterSpacing: 1,
    marginBottom: 10,
    textAlign: 'center',
  },
  demoPillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  demoPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(17, 24, 39, 0.05)',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  demoPillText: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 11,
    color: COLORS.textSecondary,
  },
});
