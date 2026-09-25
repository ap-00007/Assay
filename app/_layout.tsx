import { Stack } from 'expo-router';
import { useFonts, AnticDidone_400Regular } from '@expo-google-fonts/antic-didone';
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_600SemiBold,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';
import { Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { COLORS } from '../constants/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    AnticDidone_400Regular,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
    DMSans_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      {/* Entry point — redirects to splash */}
      <Stack.Screen name="index" />

      {/* Pre-auth flows */}
      <Stack.Screen name="splash/index" options={{ animation: 'fade' }} />
      <Stack.Screen name="onboarding/index" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="auth/register" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="financial-setup/index" options={{ animation: 'slide_from_right' }} />

      {/* Main Tab App */}
      <Stack.Screen name="(tabs)" />

      {/* Feature Screens (stack over tabs) */}
      <Stack.Screen
        name="add-transaction/index"
        options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
      />
      <Stack.Screen
        name="analytics/index"
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="recurring/index"
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="cashflow/index"
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="debt/index"
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="recommendations/index"
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="whatif/index"
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="receipt-scanner/index"
        options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
      />

      {/* Legacy screens (kept for compat) */}
      <Stack.Screen name="transaction/[id]" options={{ presentation: 'modal' }} />
      <Stack.Screen name="split/index" options={{ presentation: 'modal' }} />
      <Stack.Screen name="ai/index" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
