import { Stack } from 'expo-router';
import { Platform, LogBox } from 'react-native';
import { useFonts, AnticDidone_400Regular } from '@expo-google-fonts/antic-didone';
import { 
  DMSans_400Regular, 
  DMSans_500Medium, 
  DMSans_600SemiBold, 
  DMSans_700Bold 
} from '@expo-google-fonts/dm-sans';
import { Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { COLORS } from '../constants/theme';

// Robust suppression of upstream third-party React Native Web deprecation warnings
// originating from @react-navigation / expo-router internals (props.pointerEvents and shadow*)
if (Platform.OS === 'web' && typeof console !== 'undefined' && console.warn) {
  const originalWarn = console.warn;
  console.warn = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('"shadow*" style props are deprecated') ||
       args[0].includes('props.pointerEvents is deprecated'))
    ) {
      return;
    }
    originalWarn(...args);
  };
}

LogBox.ignoreLogs([
  '"shadow*" style props are deprecated',
  'props.pointerEvents is deprecated',
]);

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
      <Stack.Screen name="index" />
      <Stack.Screen name="auth/login" options={{ presentation: 'card' }} />
      <Stack.Screen name="auth/signup" options={{ presentation: 'card' }} />
      <Stack.Screen name="auth/forgot-password" options={{ presentation: 'card' }} />
      <Stack.Screen name="connect/index" options={{ presentation: 'card' }} />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="transaction/[id]" options={{ presentation: 'card' }} />
      <Stack.Screen name="split/index" options={{ presentation: 'modal' }} />
      <Stack.Screen name="ai/index" options={{ presentation: 'card' }} />
      <Stack.Screen name="debt/index" options={{ presentation: 'card' }} />
      <Stack.Screen name="copilot/analysis" options={{ presentation: 'card' }} />
      <Stack.Screen name="copilot/affordability" options={{ presentation: 'card' }} />
      <Stack.Screen name="simulator/index" options={{ presentation: 'card' }} />
      <Stack.Screen name="settings/profile" options={{ presentation: 'card' }} />
      <Stack.Screen name="settings/connected-accounts" options={{ presentation: 'card' }} />
      <Stack.Screen name="settings/categories" options={{ presentation: 'card' }} />
      <Stack.Screen name="settings/notifications" options={{ presentation: 'card' }} />
      <Stack.Screen name="settings/privacy" options={{ presentation: 'card' }} />
      <Stack.Screen name="settings/appearance" options={{ presentation: 'card' }} />
      <Stack.Screen name="settings/language" options={{ presentation: 'card' }} />
      <Stack.Screen name="settings/help" options={{ presentation: 'card' }} />
      <Stack.Screen name="settings/feedback" options={{ presentation: 'card' }} />
    </Stack>
  );
}
