import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';
import { COLORS, SIZES, SPACING } from '../constants/theme';
import { LayoutDashboard, Sparkles } from 'lucide-react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.iconCircle}>
            <Sparkles size={36} color={COLORS.gold} strokeWidth={2} />
          </View>
          <Typography variant="display" color={COLORS.white} style={styles.brandTitle}>
            Assay
          </Typography>
          <Typography variant="caption" color={COLORS.gold} style={styles.tagline}>
            FINANCIAL INTELLIGENCE
          </Typography>
        </View>

        <View style={styles.textContainer}>
          <Typography variant="h1" color={COLORS.white} align="center" style={styles.subtitle}>
            Understand your money with quiet clarity.
          </Typography>
          <Typography variant="body" color={COLORS.textSecondary} align="center" style={styles.description}>
            AI-powered receipt extraction, spend tracking, and hidden leak analysis.
          </Typography>
        </View>
      </View>

      <View style={styles.footer}>
        <Button 
          title="Get Started" 
          variant="gold" 
          onPress={() => router.replace('/(tabs)')}
        />
        <Button 
          title="I already have an account" 
          variant="secondary" 
          onPress={() => router.replace('/(tabs)')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(214, 169, 40, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(214, 169, 40, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  brandTitle: {
    fontSize: 44,
  },
  tagline: {
    letterSpacing: 2,
    marginTop: 6,
    fontWeight: '600',
  },
  textContainer: {
    alignItems: 'center',
    gap: 12,
    maxWidth: 320,
  },
  subtitle: {
    lineHeight: 38,
  },
  description: {
    lineHeight: 24,
  },
  footer: {
    padding: SIZES.padding,
    paddingBottom: 40,
    gap: 12,
  },
});
