import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';
import { COLORS, SIZES } from '../constants/theme';
import { LayoutDashboard } from 'lucide-react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <LayoutDashboard size={64} color={COLORS.gold} strokeWidth={1.5} />
          <Typography variant="h1" color={COLORS.white} style={styles.title}>
            Assay
          </Typography>
        </View>

        <View style={styles.textContainer}>
          <Typography variant="h2" color={COLORS.white} align="center" style={styles.subtitle}>
            Understand your money.
          </Typography>
          <Typography variant="body" color={COLORS.textMuted} align="center">
            Take control of every rupee.
          </Typography>
        </View>
      </View>

      <View style={styles.footer}>
        <Button 
          title="Get Started" 
          variant="gold" 
          onPress={() => router.replace('/(tabs)')}
          style={styles.button}
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
    marginBottom: 60,
  },
  title: {
    marginTop: 20,
  },
  textContainer: {
    alignItems: 'center',
    gap: 12,
  },
  subtitle: {
    marginBottom: 8,
  },
  footer: {
    padding: SIZES.padding,
    paddingBottom: 40,
    gap: 16,
  },
  button: {
    marginBottom: 8,
  },
});
