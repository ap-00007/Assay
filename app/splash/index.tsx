import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../components/Typography';
import { COLORS, FONTS, SIZES, SPACING } from '../../constants/theme';
import { TrendingUp, Brain, Target } from 'lucide-react-native';

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(30);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 900,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* Background glow */}
      <View style={styles.glowTopRight} />
      <View style={styles.glowBottomLeft} />

      <Animated.View
        style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
      >
        {/* Logo */}
        <View style={styles.logoSection}>
          <View style={styles.logoMark}>
            <View style={[styles.bar, { height: 16, opacity: 0.5 }]} />
            <View style={[styles.bar, { height: 26, opacity: 0.75 }]} />
            <View style={[styles.bar, { height: 36 }]} />
            <View style={[styles.bar, { height: 28, opacity: 0.75 }]} />
            <View style={[styles.bar, { height: 20, opacity: 0.5 }]} />
          </View>

          <Typography variant="h1" color={COLORS.white} style={styles.appName}>
            FinCopilot
          </Typography>
          <Typography variant="secondary" color={COLORS.gold} style={styles.tagline}>
            From Transactions to Action.
          </Typography>
        </View>

        {/* Feature Bullets */}
        <View style={styles.features}>
          <FeatureBullet
            icon={<TrendingUp color={COLORS.gold} size={18} strokeWidth={2} />}
            text="All your finances in one place"
          />
          <FeatureBullet
            icon={<Brain color={COLORS.gold} size={18} strokeWidth={2} />}
            text="AI-powered insights & predictions"
          />
          <FeatureBullet
            icon={<Target color={COLORS.gold} size={18} strokeWidth={2} />}
            text="Personalized recommendations"
          />
        </View>

        {/* Tagline */}
        <View style={styles.heroTextBlock}>
          <Typography variant="h2" color={COLORS.white} style={styles.heroLine}>
            Smarter Money,
          </Typography>
          <Typography variant="h2" color={COLORS.gold} style={styles.heroLine}>
            Brighter Tomorrow.
          </Typography>
        </View>
      </Animated.View>

      {/* CTA */}
      <Animated.View style={[styles.ctaSection, { opacity: fadeAnim }]}>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => router.push('/onboarding')}
          activeOpacity={0.85}
        >
          <Typography variant="bodyMedium" color={COLORS.primary} style={styles.ctaText}>
            Get Started
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signInLink}
          onPress={() => router.replace('/(tabs)')}
          activeOpacity={0.7}
        >
          <Typography variant="secondary" color={COLORS.textSecondary}>
            Already have an account?{' '}
          </Typography>
          <Typography variant="secondary" color={COLORS.gold}>
            Sign In
          </Typography>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

function FeatureBullet({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <View style={styles.bullet}>
      <View style={styles.bulletIcon}>{icon}</View>
      <Typography variant="body" color="rgba(255,255,255,0.85)" style={styles.bulletText}>
        {text}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xxxl,
  },
  glowTopRight: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: COLORS.gold,
    opacity: 0.06,
  },
  glowBottomLeft: {
    position: 'absolute',
    bottom: 40,
    left: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: COLORS.gold,
    opacity: 0.04,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: SPACING.xxl,
  },
  logoSection: {
    gap: SPACING.sm,
  },
  logoMark: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 5,
    marginBottom: SPACING.base,
  },
  bar: {
    width: 10,
    backgroundColor: COLORS.gold,
    borderRadius: 3,
  },
  appName: {
    fontSize: 40,
    lineHeight: 48,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 15,
    fontFamily: FONTS.bodyMedium,
    letterSpacing: 0.2,
    marginTop: 2,
  },
  features: {
    gap: SPACING.md,
  },
  bullet: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  bulletIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(214,169,40,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bulletText: {
    fontSize: 15,
    flex: 1,
  },
  heroTextBlock: {
    gap: 2,
  },
  heroLine: {
    fontSize: 32,
    lineHeight: 40,
  },
  ctaSection: {
    gap: SPACING.base,
  },
  ctaButton: {
    backgroundColor: COLORS.gold,
    paddingVertical: SPACING.base + 2,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  ctaText: {
    fontSize: 16,
    fontFamily: FONTS.bodySemiBold,
  },
  signInLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
