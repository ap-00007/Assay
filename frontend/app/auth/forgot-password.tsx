import React, { useState } from 'react';
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
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react-native';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { AuthInput } from '../../components/auth/AuthInput';
import { AuthErrorBanner } from '../../components/auth/AuthErrorBanner';
import { COLORS, SIZES, SPACING, FONTS } from '../../constants/theme';
import { validateEmail, AuthError } from '../../services/auth';

export default function ForgotPasswordScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);

  const handleResetPassword = async () => {
    setFieldError(null);
    setError(null);

    if (!email.trim()) {
      setFieldError('Please enter your email address.');
      return;
    }

    if (!validateEmail(email)) {
      setFieldError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      // Simulate reset request
      await new Promise((resolve) => setTimeout(resolve, 600));
      setEmailSent(true);
    } catch (err) {
      setError({
        type: 'network_error',
        message: 'Unable to process reset request. Please check your connection.',
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
          </View>

          {!emailSent ? (
            <>
              {/* Main Header */}
              <View style={styles.headerSection}>
                <Typography variant="pageTitle" style={styles.pageTitle}>
                  Reset password.
                </Typography>
                <Typography variant="body" color={COLORS.textSecondary} style={styles.subtitle}>
                  Enter the email associated with your ASSAY account and we'll send recovery instructions.
                </Typography>
              </View>

              <AuthErrorBanner error={error} onDismiss={() => setError(null)} />

              {/* Form Card */}
              <View style={styles.formCard}>
                <AuthInput
                  label="Email Address"
                  placeholder="name@example.com"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (fieldError) setFieldError(null);
                  }}
                  keyboardType="email-address"
                  autoComplete="email"
                  icon={<Mail size={18} color={COLORS.textSecondary} strokeWidth={1.8} />}
                  error={fieldError}
                />

                <Button
                  title="Send Reset Instructions"
                  variant="primary"
                  size="lg"
                  loading={loading}
                  onPress={handleResetPassword}
                  style={styles.actionButton}
                />
              </View>
            </>
          ) : (
            <View style={styles.successCard}>
              <View style={styles.successIconCircle}>
                <CheckCircle2 size={36} color={COLORS.success} strokeWidth={2} />
              </View>

              <Typography variant="h2" color={COLORS.primary} style={styles.successTitle}>
                Check your inbox
              </Typography>

              <Typography variant="body" color={COLORS.textSecondary} align="center" style={styles.successText}>
                We've sent password reset instructions to{' '}
                <Text style={{ fontFamily: FONTS.bodySemiBold, color: COLORS.primary }}>
                  {email}
                </Text>
                . Please check your spam folder if it doesn't appear within 2 minutes.
              </Typography>

              <Button
                title="Return to Sign In"
                variant="primary"
                size="lg"
                onPress={() => router.replace('/auth/login')}
                style={styles.actionButton}
              />
            </View>
          )}

          {/* Secondary Action */}
          <View style={styles.footerSecondary}>
            <Text style={styles.secondaryPrompt}>Remember your credentials? </Text>
            <TouchableOpacity
              onPress={() => router.replace('/auth/login')}
              activeOpacity={0.7}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.secondaryLink}>Sign In</Text>
            </TouchableOpacity>
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
    marginBottom: SPACING.xxl,
    height: 44,
    justifyContent: 'center',
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
  headerSection: {
    marginBottom: SPACING.xxl,
  },
  pageTitle: {
    fontSize: 36,
    lineHeight: 44,
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
  actionButton: {
    height: 52,
    borderRadius: SIZES.radius,
    marginTop: 8,
  },
  successCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.cardRadius,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  successIconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  successTitle: {
    marginBottom: 10,
    textAlign: 'center',
  },
  successText: {
    lineHeight: 22,
    marginBottom: 24,
    textAlign: 'center',
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
});
