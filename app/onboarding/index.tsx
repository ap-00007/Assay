import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../components/Typography';
import { COLORS, FONTS, SIZES, SPACING } from '../../constants/theme';
import { MOCK_ONBOARDING_SLIDES } from '../../constants/mockData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setActiveSlide(index);
  };

  const handleNext = () => {
    if (activeSlide < MOCK_ONBOARDING_SLIDES.length - 1) {
      scrollRef.current?.scrollTo({ x: (activeSlide + 1) * SCREEN_WIDTH, animated: true });
    } else {
      router.push('/auth/register');
    }
  };

  const isLast = activeSlide === MOCK_ONBOARDING_SLIDES.length - 1;

  return (
    <SafeAreaView style={styles.container}>
      {/* Skip */}
      <View style={styles.topBar}>
        <View />
        <TouchableOpacity onPress={() => router.replace('/auth/register')} activeOpacity={0.7}>
          <Typography variant="secondary" color={COLORS.textSecondary}>
            Skip
          </Typography>
        </TouchableOpacity>
      </View>

      {/* Slides */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={styles.slider}
      >
        {MOCK_ONBOARDING_SLIDES.map((slide) => (
          <View key={slide.id} style={[styles.slide, { width: SCREEN_WIDTH }]}>
            {/* Illustration */}
            <View style={styles.illustrationWrapper}>
              <View style={styles.illustrationCircle}>
                <Typography variant="h1" style={styles.illustrationEmoji}>
                  {slide.emoji}
                </Typography>
              </View>
              {/* Decorative rings */}
              <View style={styles.ring1} />
              <View style={styles.ring2} />
            </View>

            <View style={styles.textBlock}>
              <Typography variant="h2" color={COLORS.text} style={styles.slideTitle}>
                {slide.title}
              </Typography>
              <Typography variant="body" color={COLORS.textSecondary} style={styles.slideSubtitle}>
                {slide.subtitle}
              </Typography>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Dots + Button */}
      <View style={styles.footer}>
        <View style={styles.dotsRow}>
          {MOCK_ONBOARDING_SLIDES.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === activeSlide
                  ? styles.dotActive
                  : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext} activeOpacity={0.85}>
          <Typography variant="bodyMedium" color={COLORS.white} style={styles.nextText}>
            {isLast ? 'Get Started' : 'Next →'}
          </Typography>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.base,
    paddingBottom: SPACING.sm,
  },
  slider: {
    flex: 1,
  },
  slide: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.xxl,
  },
  illustrationWrapper: {
    width: 220,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  illustrationCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  illustrationEmoji: {
    fontSize: 64,
    lineHeight: 72,
  },
  ring1: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 95,
    borderWidth: 1.5,
    borderColor: COLORS.gold,
    opacity: 0.25,
  },
  ring2: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 1,
    borderColor: COLORS.gold,
    opacity: 0.12,
  },
  textBlock: {
    gap: SPACING.md,
    alignItems: 'center',
  },
  slideTitle: {
    fontSize: 26,
    lineHeight: 34,
    textAlign: 'center',
  },
  slideSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: COLORS.textSecondary,
  },
  footer: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xxxl,
    gap: SPACING.xl,
    alignItems: 'center',
  },
  dotsRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 24,
    backgroundColor: COLORS.primary,
  },
  dotInactive: {
    width: 8,
    backgroundColor: COLORS.border,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.base + 2,
    paddingHorizontal: SPACING.xxxl,
    borderRadius: SIZES.radius,
    minWidth: 180,
    alignItems: 'center',
  },
  nextText: {
    fontSize: 16,
    fontFamily: FONTS.bodySemiBold,
  },
});
